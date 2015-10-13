/**
* EditorCtrl.js
* Main controller for OpenCompare Editor
*/
angular
  .module('openCompareEditor')
  .controller("EditorCtrl", function($controller, $rootScope, $scope, $timeout, uiGridConstants, $compile, $modal, expandeditor,  $location, pcmApi, editorUtil, openCompareServer, componentUtils) {

    /* Load material design */
    if($.material) {
        $.material.init();
    }


    /* Define subControllers, because we're in the grid, we can't create new controller on sub div */
    var subControllers = {
      $scope: $scope,
      $location: $location
    };

    $controller('GridCtrl', subControllers);
    $controller('UndoRedoCtrl', subControllers);
    $controller('CommandsCtrl', subControllers);
    $controller('FiltersCtrl', subControllers);
    $controller('TypesCtrl', subControllers);
    $controller('FeatureGroupCtrl', subControllers);


    // ----- Start init ------ //
    // Load PCM
    $scope.$watch("pcm", function() {
      if (typeof $scope.pcm !== 'undefined') {
        $timeout(function(){
          $scope.initializeEditor($scope.pcm, $scope.metadata, false, true);
        }, 100);
      }
    });

    //Export
    $scope.export_content = null;

    //Use for modals
    $scope.oldFeatureName = "";
    $scope.featureName = "";

    $scope.loaded = false;
    $scope.lineView = true;

    // ----- End init ------ //


    // Set grid in edit/view mode
    $scope.$watch("state.edit", function setEdit(bool) {
      $scope.gridOptions.columnDefs = [];
      $scope.gridOptions.rowHeight = 35;
      $scope.state.edit = bool;
      $scope.state.configurator = false;

      if (typeof $scope.pcm !== "undefined") {
        $timeout(function(){
          $scope.initializeEditor($scope.pcm, $scope.metadata, false, true);
        }, 100);
      }

    });

    $scope.cancel = function() {
      $scope.state.edit = false;
    };


    /* Button to increase row height */
    $scope.$watch('state.height', function(newHeight) {
      $scope.gridOptions.rowHeight = 35 * newHeight;
      $scope.setGridHeight();
    });

    $scope.$on('goToCell', function(event, args) {
      $scope.scrollToFocus(args.row, args.col);
    });

    $scope.$on('addProduct', function(event, arg) {
      $scope.addProduct();
    });

    $scope.setGridHeight = function() {

        if($scope.pcmData) {
            if($scope.pcmData.length * $scope.gridOptions.rowHeight + 100 > $(window).height()* 2 / 3 && !$scope.enableEdit) {
                $scope.height = $(window).height() * 2 / 3;
            }
            else if($scope.pcmData.length * $scope.gridOptions.rowHeight + 100 > $(window).height() && $scope.enableEdit) {
                var height = 20;

                if(editorUtil.GetUrlValue('enableExport') == 'true' || editorUtil.GetUrlValue('enableShare') == 'true') {
                        height += 40;

                }
                if(editorUtil.GetUrlValue('enableTitle') == 'true') {
                    if($scope.pcm.name.length > 30) {
                        height += 120;
                    }
                    else {
                        height += 60;
                    }

                }
                if($scope.enableEdit) {
                    if($scope.state.edit) {
                        height += 80;
                    }
                    else {
                        height += 40;
                    }
                }
                $scope.height = $(window).height()-height;
            }
            else{
                $scope.height = $scope.pcmData.length * $scope.gridOptions.rowHeight + 130;
            }
        }
    };

    /* Convert grid to pcm for mongoDB */
    function convertGridToPCM(pcmData) {
        var pcm = pcmApi.factory.createPCM();
        pcm.name = $scope.pcm.name;

        var featuresMap = {};
        var featureGroupsMap = {};

        var index = 0;
        pcmData.forEach(function(productData) {
            // Create product
            var product = pcmApi.factory.createProduct();
            product.name = productData.name;
            pcm.addProducts(product);
            var featureGroups = $scope.gridOptions.superColDefs;
            var features = $scope.gridOptions.columnDefs;

            if(featureGroups.length > 0) {
                for(var i = 0; i < featureGroups.length; i++) {

                    var decodedFeatureGroupName = editorUtil.convertStringToPCMFormat(featureGroups[i].name);
                    var codedFeatureGroupName = featureGroups[i].name;

                    if (!featureGroupsMap.hasOwnProperty(codedFeatureGroupName)) {
                        if (codedFeatureGroupName != 'emptyFeatureGroup') {
                            var featureGroup = pcmApi.factory.createFeatureGroup();
                            featureGroup.name = decodedFeatureGroupName;
                            featureGroupsMap[decodedFeatureGroupName] = featureGroup;

                            var featuresWithThisFeatureGroup = $scope.getFeaturesWithThisFeatureGroup(codedFeatureGroupName, features);

                            for (var j = 0; j < featuresWithThisFeatureGroup.length; j++) {
                                if (!featuresMap.hasOwnProperty(editorUtil.convertStringToPCMFormat(featuresWithThisFeatureGroup[j]))
                                    && featuresWithThisFeatureGroup[j] !== " "
                                    && featuresWithThisFeatureGroup[j] !== "Product") {
                                    var featureToAdd = pcmApi.factory.createFeature();
                                    featureToAdd.name = editorUtil.convertStringToPCMFormat(featuresWithThisFeatureGroup[j]);
                                    featureGroup.addSubFeatures(featureToAdd);
                                    featuresMap[editorUtil.convertStringToPCMFormat(featuresWithThisFeatureGroup[j])] = featureToAdd;
                                }
                            }
                            pcm.addFeatures(featureGroup);
                        }
                        else {
                            var featuresWithThisFeatureGroup = $scope.getFeaturesWithThisFeatureGroup(featureGroups[i].name, features);
                            for (var k = 0; k < featuresWithThisFeatureGroup.length; k++) {
                                if (!featuresMap.hasOwnProperty(featuresWithThisFeatureGroup[k])
                                && featuresWithThisFeatureGroup[k] !== " "
                                 && featuresWithThisFeatureGroup[k] !== "Product")  {
                                    featureGroupsMap[editorUtil.convertStringToPCMFormat(featureGroups[i].name)] = 'empty';
                                    var featureToAdd = pcmApi.factory.createFeature();
                                    featureToAdd.name = editorUtil.convertStringToPCMFormat(featuresWithThisFeatureGroup[k]);
                                    featuresMap[editorUtil.convertStringToPCMFormat(featuresWithThisFeatureGroup[k])] = featureToAdd;
                                    pcm.addFeatures(featureToAdd);
                            }

                            }

                        }
                    }
                }
                $scope.gridOptions.columnDefs.forEach(function (featureData) {

                    var decodedFeatureName = editorUtil.convertStringToPCMFormat(featureData.name);
                    var codedFeatureName = featureData.name;
                    if(productData.hasOwnProperty(decodedFeatureName)  && decodedFeatureName !== " "
                        && decodedFeatureName !== "Product") {
                        var feature = featuresMap[decodedFeatureName];

                        // Create cell
                        var cell = pcmApi.factory.createCell();

                        cell.feature = feature;
                        cell.content = productData[codedFeatureName];
                        cell.rawContent = $scope.pcmDataRaw[index][codedFeatureName];
                        product.addCells(cell);
                    }
                });
            }
            else {
                $scope.gridOptions.columnDefs.forEach(function (featureData) {

                    var decodedFeatureName = editorUtil.convertStringToPCMFormat(featureData.name);
                    var codedFeatureName = featureData.name;

                    if(productData.hasOwnProperty(decodedFeatureName)  && codedFeatureName !== " "
                        && codedFeatureName !== "Product") {
                        // Create feature if not existing
                        if (!featuresMap.hasOwnProperty(decodedFeatureName)) {
                            var feature = pcmApi.factory.createFeature();
                            feature.name = decodedFeatureName;
                            pcm.addFeatures(feature);
                            featuresMap[decodedFeatureName] = feature;
                        }
                        var feature = featuresMap[decodedFeatureName];

                        // Create cell
                        var cell = pcmApi.factory.createCell();
                        cell.feature = feature;
                        cell.content = productData[codedFeatureName];
                        cell.rawContent = $scope.pcmDataRaw[index][codedFeatureName];
                        product.addCells(cell);
                    }
                });
            }

            index++;
        });

        // Encode PCM in Base64
        pcmApi.encodePCM(pcm);

        return pcm;
    }

    /**
     *  Use after adding a product
     */
    $scope.scrollToFocus = function( rowIndex, colIndex ) {

        $scope.gridApi.cellNav.scrollToFocus( $scope.pcmData[rowIndex], $scope.gridOptions.columnDefs[colIndex]);
    };

    /**
     * Save PCM on the server
     */
    $scope.$on('save', function(event, args) {
      var pcmToSave = convertGridToPCM($scope.pcmData);
      $scope.metadata = generateMetadata($scope.pcmData, $scope.gridOptions.columnDefs);
      var jsonModel = JSON.parse(pcmApi.serializePCM(pcmToSave));

      var pcmObject = {};
      pcmObject.metadata = $scope.metadata;
      pcmObject.pcm = jsonModel;

      if (typeof $scope.id === 'undefined') {
        openCompareServer.post("/api/create", pcmObject).then(function(response) {
          $scope.id = response.data;
          console.log("model created with id=" + $scope.id);
          $rootScope.$broadcast('savedFromCreator', $scope.id);
          $scope.state.saved = true;
        }, function(error) {
          console.error(error);
        });
      } else {
        openCompareServer.post("/api/save/" + $scope.id, pcmObject).then(function() {
          console.log("model saved");
          $scope.state.saved = true;
        });
      }
    });

    /**
     * Generate metadata like products and features positions
     * @param product
     * @param columns
     * @returns {{}}
     */
    function generateMetadata(product, columns) {
      if (typeof $scope.metadata === 'undefined') {
        $scope.metadata = {};
      }

      var metadata = $scope.metadata;
      metadata.featurePositions = [];
      metadata.productPositions = [];
      var index = 0;
      product.forEach(function (product) {
          var object = {};
          object.product = product.name;
          object.position = index;
          metadata.productPositions.push(object);
          index++;
      });
      index = 0;
      columns.forEach(function (column) {
          var object = {};
          object.feature = editorUtil.convertStringToPCMFormat(column.name);
          object.position = index;
          metadata.featurePositions.push(object);
          index++;
      });

      return metadata;
    }


    /**
     * Bind events from toolbar to functions of the editor
      */

    /**
     * Launch Exportation
     */
    $scope.$on('export', function (event, args) {
        var pcmToExport = convertGridToPCM($scope.pcmData);
        $scope.metadata = generateMetadata($scope.pcmData, $scope.gridOptions.columnDefs);
        var jsonModel = JSON.parse(pcmApi.serializePCM(pcmToExport));
        $scope.pcmObject = {};
        $scope.pcmObject.metadata = $scope.metadata;
        $scope.pcmObject.pcm = jsonModel;

        var ctrlArg = args.toUpperCase().charAt(0) + args.substring(1);
        $modal.open({
            templateUrl: "templates/modal/modal" + ctrlArg + "Export.html",
            controller: ctrlArg + "ExportCtrl",
            scope: $scope,
            size: "lg"
        })

    });

});

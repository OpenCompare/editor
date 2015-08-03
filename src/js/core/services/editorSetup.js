/**
 * Created by hvallee on 8/3/15.
 */
pcmEditor.service("editorSetup", ['editorData', 'filterService', 'typesService', 'editorOptions', function(editorData, filterService, typesService, editorOptions) {

    /* Grid functions */
    this.navigateFunctions = [];
    this.columnSizeChangedFunctions = [];
    this.beginCellEditFunctions = [];
    this.afterCellEditFunctions = [];
    this.columnPositionChanged = [];

    this.setColumns = function(features) {
        var columns = [];

        for(var i = 0; i < features.length; i++) {
            var feature = features[i];
            columns.push(newColumn(feature.name, feature.type));
        }
        return columns
    };

    this.newColumn = function(featureName, featureType) {
        var columnDef = {
            name: codedFeatureName,
            displayName: featureName,
            width: '*',
            enableSorting: true,
            enableHiding: false,
            enableFiltering: true,
            enableColumnResizing: true,
            enableColumnMoving: editorOptions.edit,
            enableCellEdit: editorOptions.edit,
            enableCellEditOnFocus: editorOptions.edit,
            allowCellFocus: true,
           // superCol: featureGroupName,
            filter: {term: ''},
            minWidth: editorOptions.minWidth,
            menuItems: [
                {
                    title: 'Hide',
                    icon: 'fa fa-eye-slash',
                    action: function($event) {
                        $scope.gridOptions.columnDefs.forEach(function(featureData) {
                            if(featureData.name === codedFeatureName) {
                                columnDef.visible = false;
                                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                            }
                        });
                        $rootScope.$broadcast('reloadFeatureGroup');
                    }
                },
                {
                    title: 'Rename Feature',
                    shown: function () {
                        return $scope.edit;
                    },
                    icon: 'fa fa-pencil',
                    action: function($event) {
                        $('#modalRenameFeature').modal('show');
                        $scope.oldFeatureName = featureName;
                        $scope.featureName = featureName;
                    }
                },
                {
                    title: 'Change Type',
                    shown: function () {
                        return $scope.edit;
                    },
                    icon: 'fa fa-exchange',
                    action: function($event) {
                        $('#modalChangeType').modal('show');
                        $scope.oldFeatureName = featureName;
                        $scope.featureName = featureName;
                        $scope.featureType = $scope.columnsType[codedFeatureName];
                    }
                },
                {
                    title: 'Delete Feature',
                    shown: function () {
                        return $scope.edit;
                    },
                    icon: 'fa fa-trash-o',
                    action: function($event) {
                        $scope.deleteFeature(codedFeatureName);
                    }
                },
                {
                    title: 'Unhide everything',
                    icon: 'fa fa-eye',
                    action: function($event) {
                        $scope.gridOptions.columnDefs.forEach(function(featureData) {
                            featureData.visible = true;
                        });
                        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                        $rootScope.$broadcast('reloadFeatureGroup');
                    }
                }
            ],
            cellClass: function(grid, row, col) {
                var rowValue = $scope.pcmDataRaw[$scope.pcmData.indexOf(row.entity)];
                if($scope.validating && $scope.validation[col.name] && !$scope.validation[col.name][$scope.pcmData.indexOf(row.entity)]) {
                    return 'warningCell';
                }
                else if(rowValue) {
                    return getCellClass(rowValue[col.name], featureType);
                }
            },
            cellTooltip: function(row, col) {
                var rawValue = $scope.pcmDataRaw[$scope.pcmData.indexOf(row.entity)];
                var contentValue = $scope.pcmData[$scope.pcmData.indexOf(row.entity)];
                if($scope.validating && $scope.validation[col.name] && !$scope.validation[col.name][$scope.pcmData.indexOf(row.entity)]) {
                    return "This value doesn't seem to match the feature type.";
                }
                else if(rawValue && getCellTooltip(rawValue[col.name])){
                    return getCellTooltip(rawValue[col.name]);
                }
                else if(contentValue) {
                    return contentValue[col.name];
                }
            }
        };
        switch(featureType) {
            case "string":
                columnDef.filterHeaderTemplate="" +
                    "<div class='ui-grid-filter-container'>" +
                    "   <button class='btn btn-primary fa fa-search btn-sm' ng-click='grid.appScope.showFilter(col)'>" +
                    "   </button>" +
                    "   <button ng-show='grid.appScope.isFilterOn(col)' class='btn btn-default btn-sm fa fa-close'  ng-click='grid.appScope.removeFilter(col)'>" +
                    "   </button>" +
                    "</div>";
                columnDef.filter.noTerm = true;
                columnDef.filter.condition = function (searchTerm,  cellValue) {
                    return $scope.filterStringColumns(cellValue, codedFeatureName);
                };
                break;
            case "number":
                var filterLess = [];
                filterLess.condition  = function (searchTerm,  cellValue) {
                    return $scope.filterLessNumberColumns(cellValue, columnDef, codedFeatureName);
                };
                columnDef.filterHeaderTemplate="" +
                    "<div class='ui-grid-filter-container'>" +
                    "   <button class='btn btn-primary btn-sm fa fa-sliders' ng-click='grid.appScope.showFilter(col)' data-toggle='modal' data-target='#modalSlider'>" +
                    "   </button>" +
                    "   <button  ng-show='grid.appScope.isFilterOn(col)' class='btn btn-default btn-sm fa fa-close' ng-click='grid.appScope.removeFilter(col)'>" +
                    "   </button>" +
                    "</div>";
                var filterGreater = [];
                filterGreater.condition  = function (searchTerm,  cellValue) {
                    return $scope.filterGreaterNumberColumns(cellValue, columnDef, codedFeatureName);
                };
                columnDef.filters = [];
                columnDef.filters.push(filterGreater);
                columnDef.filters.push(filterLess);
                break;
            case "boolean":
                var filterName = 'filter'+featureName.replace(/[&-/\s]/gi, '');
                var columnFilterValue = $scope.columnsFilters[codedFeatureName];
                columnDef.filterHeaderTemplate="" +
                    "<div class='ui-grid-filter-container'>" +
                    "<button class='btn btn-primary btn-sm' ng-class='{\"btn btn-primary btn-sm \" : grid.appScope.isFilterOn(col) == 1, \"btn btn-flat btn-primary btn-sm\": grid.appScope.isFilterOn(col) != 1}' ng-click='grid.appScope.applyBooleanFilter(col, 1)' ><i class='fa fa-check-circle'></i></button>" +
                    "<button class='btn btn-danger btn-flat' ng-class='{\"btn btn-danger btn-sm \" : grid.appScope.isFilterOn(col) == 2, \"btn btn-flat btn-danger btn-sm\": grid.appScope.isFilterOn(col) != 2}' btn-xs' ng-click='grid.appScope.applyBooleanFilter(col, 2)' ><i class='fa fa-times-circle'></i></button>" +
                    "</div>";
                columnDef.filter.noTerm = true;
                columnDef.filter.condition = function (searchTerm,  cellValue) {
                    return $scope.filterBooleanColumns(cellValue, codedFeatureName);
                };
                break;

        }
        return columnDef;
    };

    this.calculateGridHeight = function(dataLength) {
        var height = 0;
            if(dataLength * 28 + 90 > $(window).height()* 2 / 3 && !GetUrlValue('enableEdit')) {
                height = $(window).height() * 2 / 3;
            }
            else if(dataLength * 28 + 90 > $(window).height()) {
                height = $(window).height();
            }
            else{
                height = dataLength * 28 + 90;
            }
        return height;
    }

}]);
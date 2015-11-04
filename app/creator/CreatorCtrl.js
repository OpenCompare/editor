/**
 * Created by hvallee on 8/4/15.
 * Updated by hvallee on 17/8/15
 */

/**
 * CreatorCtrl.js
 * Use to create a pcm based on a number of rows and columns
 */
angular
  .module('openCompareEditor')
  .controller("CreatorCtrl", function($rootScope, $scope, $document, pcmApi) {

    $scope.title = "";
    $scope.rows = 1;
    $scope.columns = 1;
    $scope.loading = false;

    $scope.launchCreation = function() {
      var features = {};
      var i,j;

      $scope.state.edit = true;

      var pcm = pcmApi.factory.createPCM();
      pcm.name = $scope.title;
      var metadata = {};


      // Create features
      metadata.featurePositions = [];
      for(j = 0; j < $scope.columns + 1; j++) {
        var feature = pcmApi.factory.createFeature();

        if (j == 0) {
          feature.name = "Products";
          pcm.productsKey = feature;
        } else {
          feature.name = "Feature " + j;
        }

        pcm.addFeatures(feature);
        features[feature.name] = feature;

        metadata.featurePositions.push({
          feature: feature.name,
          position: j
        });
      }


      // Create products
      metadata.productPositions = [];
      for(i = 0; i < $scope.rows; i++) {
        var product = pcmApi.factory.createProduct();
        pcm.addProducts(product);

        var productName;

        for(j = 0; j < $scope.columns + 1; j++) {
          var cell = pcmApi.factory.createCell();

          if (j == 0 ) {
            productName = "Product " + (i + 1);
            cell.content = productName;
            cell.feature = features["Products"];

          } else {
            cell.content = "";
            cell.feature = features["Feature " + j];
          }
          product.addCells(cell);
        }

        metadata.productPositions.push({
          product: productName,
          position: i
        });
      }

      $scope.pcmContainer.pcm = pcm;
      $scope.pcmContainer.metadata = metadata;
    };


    $document.ready(function() {
      $('#modalCreator').modal('show');
    });
});

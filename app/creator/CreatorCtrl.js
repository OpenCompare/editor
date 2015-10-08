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

      for(j = 0; j < $scope.columns; j++) {
        var feature = pcmApi.factory.createFeature();
        feature.name = "Feature " + (j + 1);
        pcm.addFeatures(feature);
        features[feature.name] = feature;
      }

      for(i = 0; i < $scope.rows; i++) {
        var product = pcmApi.factory.createProduct();
        product.name = "Product " + (i + 1);
        pcm.addProducts(product);
        for(j = 0; j < $scope.columns; j++) {
          var cell = pcmApi.factory.createCell();
          cell.content = "";
          cell.feature = features["Feature " + (j + 1)];
          product.addCells(cell);
        }

      }

      $scope.pcmContainer.pcm = pcm;
    };


    $document.ready(function() {
      $('#modalCreator').modal('show');
    });
});

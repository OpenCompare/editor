/**
 * Created by gbecan on 3/26/15.
 * Updated by hvallee on 8/17/15
 */

/**
 * ToolbarCtrl.js
 * Manage editor toolbar
 */
angular
  .module('openCompareEditor')
  .controller("ToolbarCtrl", function($rootScope, $scope, $modal, componentUtils) {


    $scope.validating = false;
    $scope.configurator = false;
    $scope.lineView = true;
    $scope.launchFromCreator = false;
    $scope.isTitleSet = false;

    /**
     * Save PCM on the server
     */
    $scope.save = function() {
        $rootScope.$broadcast('save');
    };

    /**
     * Remove PCM from server
     */
    $scope.remove = function() {
      if (typeof $scope.id !== 'undefined') {
        openCompareServer.get("/api/remove/" + $scope.id).then(function() {
          window.location.href = "/";
        });
      }
    };

    $scope.setConfigurator = function(bool) {
        $scope.state.configurator = bool;
    };

    $scope.openCreateFeatureGroupModal = function() {

        $scope.$modalInstance = $modal.open({
            templateUrl: 'toolbar/modalCreateFeatureGroup.html',
            scope: $scope,
            controller: 'ToolbarCtrl'
        });
    };

    $scope.isAFeature = function(col) {
      return col.name != ' ' && col.name != 'Product';
    };

    $scope.addFeatureGroup = function(featureGroup, features) {
        $rootScope.$broadcast('addFeatureGroup', {"featureGroup": featureGroup, "features": features});
        $scope.$modalInstance.close();
    };

    $scope.addProduct = function() {
      $rootScope.$broadcast('addProduct');
    };

    $scope.cancelModal = function() {
        $scope.$modalInstance.close();
    };

    /**
     * Export
     */
    $scope.export = function(format) {
        $rootScope.$broadcast('export', format);
    };
    /**
     * Validate the type of each columns
     */
    $scope.toggleValidation= function() {
      $scope.state.validating = !$scope.state.validating;
    };

    $scope.setEdit = function(bool, reload) {
        $scope.state.edit = bool;
    };

    $scope.increaseHeight = function(height) {
      $scope.state.height = height;
    };

    $scope.undo = function() {
      $rootScope.$broadcast("undo");
    };

    $scope.redo = function() {
      $rootScope.$broadcast("redo");
    };

    $scope.$watch("pcm.name", function(name) {
      if (typeof name !== "undefined") {
        $scope.isTitleSet = name.length > 0
      }
    });

});

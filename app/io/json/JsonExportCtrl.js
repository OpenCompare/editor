angular
  .module('openCompareEditor')
  .controller("JsonExportCtrl", function($rootScope, $scope, $modal, $modalInstance, openCompareServer) {

    $scope.loading = false;
    $scope.cancel = function() {
      $modalInstance.close();
    };

    $scope.export = function(){

      $scope.export_content = "";
      $scope.loading = true;

      openCompareServer.post(
        "/api/export/json",
        {
          file: JSON.stringify($scope.pcmObject)
        }, {
          responseType: "text/plain",
          transformResponse: function(d, e) { // Needed to not interpret matrix as json (begin with '{|')
            return d;
          }
        }).then(function(response) {
          $scope.loading = false;
          $scope.export_content = response.data;
        },
        function() {
          $scope.loading = false;
        });
    }
  });


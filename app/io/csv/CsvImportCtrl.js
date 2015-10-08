/**
 * Created by smangin on 19/05/15.
 */


angular
  .module('openCompareEditor')
  .controller("CsvImportCtrl", function($rootScope, $scope, $modalInstance, openCompareServer) {

    $scope.loading = false;
    $scope.cancel = function() {
        $modalInstance.close();
    };

    // Default values
    $scope.file = null;
    $scope.title = "";
    $scope.productAsLines = true;
    $scope.separator = ',';
    $scope.quote = '"';
    $scope.message = "";

    $scope.valid = function(){
        // Request must be a multipart form data !
        var fd = new FormData();
        fd.append('file', $scope.file);
        fd.append('title', $scope.title);
        fd.append('productAsLines', $scope.productAsLines);
        fd.append('separator', $scope.separator);
        fd.append('quote', $scope.quote);

        $scope.message = "";
        $scope.loading = true;

      openCompareServer.post(
            "/api/import/csv",
            fd,
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response) {
                $scope.loading = false;
                var pcmContainer = response.data[0];
                $rootScope.$broadcast('import', pcmContainer);
                $modalInstance.close();
            }, function(response) {
                $scope.loading = false;
                $scope.message = response.data;
            });

    }
});


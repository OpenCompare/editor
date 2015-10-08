/**
 * Created by smangin on 19/05/15.
 */


angular
  .module('openCompareEditor')
  .controller("HtmlExportCtrl", function($rootScope, $scope, $modal, $modalInstance, openCompareServer) {

    $scope.loading = false;
    $scope.cancel = function() {
        $modalInstance.close();
    };

    // Default values
    $scope.title = "";
    $scope.productAsLines = true;

    $scope.valid = function(){

        $scope.export_content = "";
        $scope.loading = true;

      openCompareServer.post(
            "/api/export/html",
            {
                file: JSON.stringify($scope.pcmObject),
                title: $scope.pcm.title,
                productAsLines: $scope.productAsLines
            }, {
                responseType: "text/plain",
                transformResponse: function(d, e) { // Needed to not interpret matrix as json (begin with '{|')
                    return d;
                }
            }).then(function(response) {
                $scope.loading = false;
                $scope.export_content = response.data;
            }, function() {
                $scope.loading = false;
            });
    }
});

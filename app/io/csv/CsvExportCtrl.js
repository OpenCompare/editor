/**
 * Created by smangin on 19/05/15.
 */


angular
  .module('openCompareEditor')
  .controller("CsvExportCtrl", function($rootScope, $scope, $modal, $modalInstance, openCompareServer) {

    $scope.loading = false;
    $scope.cancel = function() {
        $modalInstance.close();
    };

    // Default values
    $scope.title = "";
    $scope.productAsLines = true;
    $scope.separator = ',';
    $scope.quote = '"';

    $scope.valid = function(){

        $scope.export_content = "";
        $scope.loading = true;

      openCompareServer.post(
            "/api/export/csv",
            {
                file: JSON.stringify($scope.pcmObject),
                title: $scope.pcm.name,
                productAsLines: $scope.productAsLines,
                separator: $scope.separator,
                quote: $scope.quote
            }, {
                responseType: "text/plain",
                transformResponse: function(d, e) { // Needed to not interpret matrix as json (begin with '{|')
                    return d;
                }
            }).then(function(response) {
                $scope.loading = false;
                $scope.export_content = response.data;

                // Prepare button for download
                var data = new Blob([$scope.export_content], {type: 'text/plain'});
                var file = window.URL.createObjectURL(data);
                var saveToFileButton = document.getElementById("saveToFile");
                saveToFileButton.href = file;
                saveToFileButton.download = $scope.pcm.name + ".csv";
            }, function() {
                $scope.loading = false;
            });
    }
});


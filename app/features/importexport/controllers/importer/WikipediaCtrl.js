/**
 * Created by smangin on 19/05/15.
 */

angular
  .module('openCompareEditor')
  .controller("WikipediaImportController", function($rootScope, $scope, $modalInstance, base64, openCompareServer) {

    $scope.pcmContainers = [];
    $scope.pcmContainerNames = [];

    $scope.loading = false;
    $scope.cancel = function() {
        $modalInstance.close();
    };

    // Default values
    $scope.url = "";
    $scope.valid = function(){

        $scope.loading = true;

      openCompareServer.post(
            "/api/import/wikipedia",
            {
                url: $scope.url
            })
            .success(function(response, status, headers, config) {
                $scope.loading = false;
                $scope.pcmContainers = response;

                if (response.length === 1) {
                    $scope.selectPCM(0);
                } else {
                    $scope.pcmContainers.forEach(function (pcmContainer, containerIndex){
                        $scope.pcmContainerNames.push({
                            name: base64.decode(pcmContainer.pcm.name),
                            index: containerIndex
                        });
                    });
                }

            }).error(function(data, status, headers, config) {
                $scope.loading = false;
                $scope.message = data
            });
    };

    $scope.selectPCM = function(index) {
        var selectedPCMContainer = $scope.pcmContainers[index];
        $rootScope.$broadcast('import', selectedPCMContainer);
        $modalInstance.close();
    };
});






/**
 * Created by smangin on 19/05/15.
 */

angular
  .module('openCompareEditor')
  .controller("WikipediaImportController", function($rootScope, $scope, $modalInstance, base64, openCompareServer) {

    $scope.pcmContainers = [];
    $scope.pcmContainerNames = [];
    $scope.message = "";

    $scope.loading = false;
    $scope.cancel = function() {
        $modalInstance.close();
    };

    // Default values
    $scope.url = "";
    $scope.valid = function(){

      $scope.loading = true;
      $scope.message = "";

      openCompareServer.post(
            "/api/import/wikipedia",
            {
                url: $scope.url
            })
            .then(function(response) {
                $scope.loading = false;
                $scope.pcmContainers = response.data;

                if (response.data.length === 1) {
                    $scope.selectPCM(0);
                } else {
                    $scope.pcmContainers.forEach(function (pcmContainer, containerIndex){
                        $scope.pcmContainerNames.push({
                            name: base64.decode(pcmContainer.pcm.name),
                            index: containerIndex
                        });
                    });
                }

            }, function(response) {
                $scope.loading = false;
                $scope.message = response.data;
            });
    };

    $scope.selectPCM = function(index) {
        var selectedPCMContainer = $scope.pcmContainers[index];
        $rootScope.$broadcast('import', selectedPCMContainer);
        $modalInstance.close();
    };
});






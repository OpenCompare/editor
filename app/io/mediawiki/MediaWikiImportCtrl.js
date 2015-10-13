/**
 * Created by smangin on 19/05/15.
 */

angular
  .module('openCompareEditor')
  .controller("MediaWikiImportCtrl", function($rootScope, $scope, base64, openCompareServer, pcmApi) {

    $scope.pcmContainers = [];
    $scope.pcmContainerNames = [];
    $scope.message = "";

    $scope.loading = false;

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

      $scope.pcmContainer.pcm = pcmApi.loadPCMModelFromString(JSON.stringify(selectedPCMContainer.pcm));
      pcmApi.decodePCM($scope.pcmContainer.pcm);
      $scope.pcmContainer.metadata = selectedPCMContainer.metadata;

      $scope.modalInstance.close();
    };
});






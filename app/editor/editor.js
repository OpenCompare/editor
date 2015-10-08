angular
  .module('openCompareEditor')
  .directive('ocEditor', function(openCompareServer, componentUtils) {

    return {
      restrict: 'E',
      scope: {
        pcmContainer: "=",
        config: "="
      },
      controller: function($scope) {

        this.pcmContainer = $scope.pcmContainer;
        this.config = $scope.config;
        this.state = {};
      },
      link : function($scope, element, attrs) {
        //$scope.$watch("config", function(){
        //  console.log($scope.config);
        //});

        $scope.$watch("config.serverMode", function(newServerMode) {
          switch (newServerMode) {
            case "client":
              openCompareServer.useClient();
              break;
            case "local":
              openCompareServer.useLocalServer();
              break;
            case "remote":
              openCompareServer.useRemoteServer($scope.config.serverAddress);
              break;
          }
        });

      }
    };
  });

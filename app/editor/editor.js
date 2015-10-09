angular
  .module('openCompareEditor')
  .directive('ocEditor', function(openCompareServer, componentUtils) {

    return {
      restrict: 'E',
      scope: {
        pcmContainer: "=",
        config: "=?",
        state: "=?"
      },
      controller: function($scope) {
        this.pcmContainer = $scope.pcmContainer;

        if (typeof $scope.config === "undefined") {
          $scope.config = {};
        }
        this.config = $scope.config;

        if (typeof $scope.state === "undefined") {
          $scope.state = {};
        }
        this.state = $scope.state;

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

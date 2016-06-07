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
        var ctrl = this;
        ctrl.pcmContainer = $scope.pcmContainer;
        $scope.$watchCollection("pcmContainer", function(newPcmContainer) {
          if (typeof newPcmContainer !== 'undefined') {
            ctrl.pcmContainer = newPcmContainer;
          }
        });

        if (typeof $scope.config === "undefined") {
          $scope.config = {};
        }
        ctrl.config = $scope.config;

        if (typeof $scope.state === "undefined") {
          $scope.state = {};
        }
        ctrl.state = $scope.state;

      },
      link : function($scope, element, attrs) {
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

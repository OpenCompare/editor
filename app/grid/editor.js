/**
 * Created by gbecan on 9/15/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareEditor', function(openCompareServer) {

    function link(scope) {
      if (typeof scope.data === 'undefined') {
        scope.data = {};
      }
    }

    function controller($scope, openCompareServer) {

      $scope.$watch("data.configuration.serverMode", function(newServerMode) {
        switch (newServerMode) {
          case "client":
            openCompareServer.useClient();
            break;
          case "local":
            openCompareServer.useLocalServer();
            break;
          case "remote":
            openCompareServer.useRemoteServer($scope.serverAddress);
            break;
        }
      });
    }

    return {
      restrict: 'E',
      scope: {
        data: "="
      },
      link : link,
      controller: controller,
      templateUrl: 'templates/pcmEditor.html'
    };
  });

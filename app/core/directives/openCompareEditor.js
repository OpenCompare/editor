/**
 * Created by gbecan on 9/15/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareEditor', function(openCompareServer) {

    function link(scope) {


    }

    function controller($scope, openCompareServer) {

      $scope.$watch("enableToolbar", function(newEnableToolbar) {
        if (typeof newEnableToolbar === 'undefined') {
          $scope.enableToolbar = true;
        }
      });

      $scope.$watch("serverMode", function(newServerMode) {
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
        pcmContainer: '=pcmContainer',
        pcmId: '=pcmId',
        enableToolbar: "=?toolbar",
        enableEdit: "=?edit",
        //activeEditor: "=activeEditor",
        //enableConfigurator: "=configurator",
        //enableExport: "=export",
        //enableShare: "=share"
        serverMode: '@',
        serverAddress: '@'
      },
      link : link,
      controller: controller,
      templateUrl: '/templates/pcmEditor.html'
    };
  });

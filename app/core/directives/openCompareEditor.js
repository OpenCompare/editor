/**
 * Created by gbecan on 9/15/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareEditor', function() {

    function link(scope) {
    }

    function controller($scope) {
    }

    return {
      restrict: 'E',
      scope: {
        pcmContainer: '=pcmContainer',
        pcmId: '=pcmId',
        enableEdit: "=edit",
        activeEditor: "=activeEditor",
        enableConfigurator: "=configurator",
        enableExport: "=export",
        enableShare: "=share"
      },
      link : link,
      controller: controller,
      templateUrl: '/templates/pcmEditor.html'
    };
  });

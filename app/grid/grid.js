/**
 * Created by gbecan on 9/15/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareEditor', function(componentUtils) {


    return {
      restrict: 'E',
      require: "^ocEditor",
      templateUrl: 'templates/pcmEditor.html',
      scope: {},
      link: function($scope, element, attrs, ctrl) {
        $scope.pcm = ctrl.pcmContainer.pcm;
        $scope.metadata = ctrl.pcmContainer.metadata;
        $scope.id = ctrl.pcmContainer.id;
        $scope.config = ctrl.config;
        $scope.state = ctrl.state;

        componentUtils.defineOption($scope.state, ["edit"], false);
        componentUtils.defineOption($scope.state, ["configurator"], false);

      }
    };
  });

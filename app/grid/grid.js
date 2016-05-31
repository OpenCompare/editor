/**
 * Created by gbecan on 9/15/15.
 */

angular
  .module('openCompareEditor')
  .directive('ocGrid', function(componentUtils) {


    return {
      restrict: 'E',
      require: "^ocEditor",
      templateUrl: 'grid/templates/pcmEditor.html',
      scope: {},
      link: function($scope, element, attrs, ctrl) {
        $scope.pcmContainer = ctrl.pcmContainer;

        $scope.$watchCollection("pcmContainer", function(newVal) {
          if (typeof newVal !== "undefined") {
            $scope.pcmContainer = ctrl.pcmContainer;
            $scope.pcm = ctrl.pcmContainer.pcm;
            $scope.metadata = ctrl.pcmContainer.metadata;
            $scope.id = ctrl.pcmContainer.id;
          }
        });

        $scope.config = ctrl.config;
        $scope.state = ctrl.state;

        componentUtils.defineOption($scope.state, ["edit"], false);
        componentUtils.defineOption($scope.state, ["configurator"], false);
        componentUtils.defineOption($scope.state, ["validating"], false);
        componentUtils.defineOption($scope.state, ["canUndo"], false);
        componentUtils.defineOption($scope.state, ["canRedo"], false);
        componentUtils.defineOption($scope.state, ["lineView"], true);
        componentUtils.defineOption($scope.state, ["height"], 1);

      }
    };
  });

/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('ocToolbar', function(componentUtils) {
        return {
          restrict: 'E',
          require: "^ocEditor",
          scope: {},
          templateUrl: 'toolbar/toolbar.html',
          controller: "ToolbarCtrl",
          link: function($scope, element, attrs, ctrl) {

            $scope.pcmContainer = ctrl.pcmContainer;

            $scope.$watch("pcmContainer.pcm", function(newVal) {
              $scope.pcm = ctrl.pcmContainer.pcm;
              $scope.metadata = ctrl.pcmContainer.metadata;
              $scope.id = ctrl.pcmContainer.id;
            });

            $scope.config = ctrl.config;
            $scope.state = ctrl.state;


            componentUtils.defineOption($scope.config, ["enableToolbar"], true);
            componentUtils.defineOption($scope.config, ["enableTitle"], true);
            componentUtils.defineOption($scope.config, ["enableEdit"], true);
            componentUtils.defineOption($scope.config, ["enableExport"], true);
            componentUtils.defineOption($scope.config, ["enableShare"], true);

            componentUtils.defineOption($scope.state, ["edit"], false);
            componentUtils.defineOption($scope.state, ["configurator"], false);
            componentUtils.defineOption($scope.state, ["validating"], false);

            componentUtils.defineOption($scope.state, ["canUndo"], false);
            componentUtils.defineOption($scope.state, ["canRedo"], false);

          }
        };
    });

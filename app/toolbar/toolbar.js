/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareToolbar', function(componentUtils) {
        return {
          restrict: 'E',
          require: "^ocEditor",
          scope: {},
          templateUrl: 'templates/toolbar.html',
          link: function($scope, element, attrs, ctrl) {
            $scope.pcm = ctrl.pcmContainer.pcm;
            $scope.metadata = ctrl.pcmContainer.metadata;
            $scope.config = ctrl.config;
            $scope.state = ctrl.state;

            componentUtils.defineOption($scope.config, ["enableToolbar"], true);
            componentUtils.defineOption($scope.config, ["enableTitle"], true);
            componentUtils.defineOption($scope.config, ["enableEdit"], true);
            componentUtils.defineOption($scope.config, ["enableExport"], true);
            componentUtils.defineOption($scope.config, ["enableShare"], true);

            componentUtils.defineOption($scope.state, ["edit"], false);

          }
        };
    });

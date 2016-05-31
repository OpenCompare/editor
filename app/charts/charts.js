/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('ocCharts', function() {
        return {
          restrict: 'E',
          require: "^ocEditor",
          scope: {},
          templateUrl: 'charts/charts.html',
          controller: "ChartsCtrl",
          link: function($scope, element, attrs, ctrl) {

            $scope.$watch("pcmContainer", function(newVal) {
              if (typeof newVal !== "undefined") {
                $scope.pcmContainer = ctrl.pcmContainer;
              }
            });

            $scope.config = ctrl.config;
            $scope.state = ctrl.state;

            $scope.$watch("pcmContainer.pcm", function(newVal) {
              if (typeof newVal !== "undefined") {
                $scope.pcm = ctrl.pcmContainer.pcm;
                $scope.metadata = ctrl.pcmContainer.metadata;
                $scope.id = ctrl.pcmContainer.id;
              }
            });

          }
        };
    });

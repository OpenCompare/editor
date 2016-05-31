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
            $scope.pcmContainer = ctrl.pcmContainer;

            $scope.$watchCollection("pcmContainer", function(newVal) {
              if (typeof newVal !== "undefined") {
                $scope.pcmContainer = ctrl.pcmContainer;
                $scope.pcm = ctrl.pcmContainer.pcm;
                if (typeof $scope.pcm !== 'undefined') {
                  $scope.productsKey = ctrl.pcmContainer.pcm.productsKey;
                }
                $scope.metadata = ctrl.pcmContainer.metadata;
                $scope.id = ctrl.pcmContainer.id;
              }
            });

            $scope.config = ctrl.config;
            $scope.state = ctrl.state;

          }
        };
    });

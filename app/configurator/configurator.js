/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('ocConfigurator', function(componentUtils) {
    return {
      restrict: 'E',
      require: "^ocEditor",
      scope: {},
      templateUrl: 'configurator/configurator.html',
      controller: "ConfiguratorCtrl",
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

        componentUtils.defineOption($scope.state, ["configurator"], false);
        componentUtils.defineOption($scope.state, ["lineView"], true);

      }
    };

  });

angular
  .module('openCompareEditor')
  .directive('ocTitle', function(componentUtils) {
    return {
      restrict: 'E',
      require: "^ocEditor",
      scope: {},
      templateUrl: 'title/title.html',
      controller: function() {

      },
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
        componentUtils.defineOption($scope.state, ["edit"], false);
        componentUtils.defineOption($scope.state, ["saved"], false);

      }
    };
  });

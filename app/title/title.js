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

        $scope.pcmContainer = ctrl.pcmContainer;

        $scope.$watch("pcmContainer.pcm", function(newVal) {
          $scope.pcm = ctrl.pcmContainer.pcm;
          $scope.metadata = ctrl.pcmContainer.metadata;
          $scope.id = ctrl.pcmContainer.id;
        });

        $scope.config = ctrl.config;
        $scope.state = ctrl.state;

        componentUtils.defineOption($scope.state, ["edit"], false);

      }
    };
  });

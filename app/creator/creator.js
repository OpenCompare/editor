/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('ocCreator', function(componentUtils) {
    return {
      restrict: 'E',
      require: "^ocEditor",
      scope: {
        user: "="
      },
      templateUrl: 'creator/creator.html',
      controller: "CreatorCtrl",
      link: function($scope, element, attrs, ctrl) {

        $scope.pcmContainer = ctrl.pcmContainer;

        $scope.$watch("pcmContainer.pcm", function(newVal) {
          $scope.pcm = ctrl.pcmContainer.pcm;

          if (typeof ctrl.pcmContainer.metadata === "undefined") {
            ctrl.pcmContainer.metadata = {};
          }
          $scope.metadata = ctrl.pcmContainer.metadata;
          $scope.metadata.creator = $scope.user;
          $scope.id = ctrl.pcmContainer.id;
        });

        $scope.config = ctrl.config;
        $scope.state = ctrl.state;


        componentUtils.defineOption($scope.state, ["edit"], false);

      }
    };
  });

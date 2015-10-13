angular
  .module('openCompareEditor')
  .directive('ocHtmlImporter', function(componentUtils) {


    return {
      restrict: 'E',
      require: "^ocEditor",
      scope: {
        api: "="
      },
      controller: function($scope, $modal) {
        $scope.api = {
          open : function() {
            $scope.modalInstance = $modal.open({
              templateUrl: "io/html/modalHtmlImport.html",
              scope: $scope,
              controller: "HtmlImportCtrl"
            })
          }
        };
      },
      link: function($scope, element, attrs, ctrl) {

        $scope.pcmContainer = ctrl.pcmContainer;
        $scope.config = ctrl.config;
        $scope.state = ctrl.state;

        $scope.$watch("pcmContainer.pcm", function(newVal) {
          $scope.pcm = ctrl.pcmContainer.pcm;
          $scope.metadata = ctrl.pcmContainer.metadata;
          $scope.id = ctrl.pcmContainer.id;
        });


      }
    };
  });

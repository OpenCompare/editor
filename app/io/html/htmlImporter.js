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

      }
    };
  });

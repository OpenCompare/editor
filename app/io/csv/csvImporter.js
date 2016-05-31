angular
  .module('openCompareEditor')
  .directive('ocCsvImporter', function(componentUtils) {


    return {
      restrict: 'E',
      require: "^ocEditor",
      //templateUrl: 'io/csv/modalCsvImport.html',
      scope: {
        api: "="
      },
      controller: function($scope, $modal) {
        $scope.api = {
          open : function() {
            $scope.modalInstance = $modal.open({
              templateUrl: "io/csv/modalCsvImport.html",
              scope: $scope,
              controller: "CsvImportCtrl"
            })
          }
        };
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


      }
    };
  });

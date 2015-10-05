/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareToolbar', function() {
        return {
          restrict: 'E',
          scope: {
            data: '='
          },
          templateUrl: 'templates/toolbar.html'
        };
    });

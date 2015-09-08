/**
 * Created by hvallee on 6/19/15.
 */

angular
  .module('openCompareEditor')
  .directive('openCompareEditor', function() {
        return {
            templateUrl: '/assets/editor/templates/pcmEditor.html'
        };
    });

angular
  .module('openCompareEditor')
  .directive('embedOpenCompareEditor', function() {
        return {
            templateUrl: 'pcmEditor.html'
        };
    });

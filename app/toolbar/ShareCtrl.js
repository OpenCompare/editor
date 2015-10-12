/**
 * Created by hvallee on 6/19/15.
 * Updated by hvallee on 8/17/15
 */

/**
 * ShareCtrl.js
 * Manage share options
 */
angular
  .module('openCompareEditor')
  .controller("ShareCtrl", function($scope) {

    $scope.activeShareButton = false;

    $scope.enableEditOption = false;
    $scope.enableExportOption = false;
    $scope.enableTitleOption = false;
    $scope.enableShareOption = false;
    $scope.enableConfiguratorOption = false;
    $scope.enableChartsOption = false;


    $scope.updateShareLinks = function() {
        $scope.activeShareButton = true;
        $scope.embedLink = '<iframe src="http://'+window.location.hostname+':'+window.location.port+'/embed/pcm/'+ $scope.id
            +'?enableEdit='+$scope.enableEditOption+'&enableExport='+$scope.enableExportOption+'&enableTitle='+$scope.enableTitleOption+'&enableShare='+$scope.enableShareOption
            +'&enableShare='+$scope.enableConfiguratorOption +'&enableShare='+$scope.enableChartsOption
            +'" scrolling="no"  width="100%" height="700px" style="border:none;"></iframe>';
        $scope.twitterLink = 'https://twitter.com/intent/tweet?text=%23opencompare&url=http://opencompare.org/pcm/'+ $scope.id;
        $scope.facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=http://opencompare.org/pcm/'+ $scope.id;
        $scope.emailLink = 'mailto:?body=http://opencompare.org/pcm/'+ $scope.id;
        $scope.googleLink = 'https://plus.google.com/share?url=http://opencompare.org/pcm/'+ $scope.id;
        $scope.redditLink = 'http://www.reddit.com/submit?url=http://opencompare.org/pcm/'+ $scope.id;
    };

    $scope.updateEmbedLink = function() {
        $scope.embedLink = '<iframe src="http://'+window.location.hostname+':'+window.location.port+'/embed/pcm/'+ $scope.id
            +'?enableEdit='+$scope.enableEditOption+'&enableExport='+$scope.enableExportOption+'&enableTitle='+$scope.enableTitleOption+'&enableShare='+$scope.enableShareOption
            +'&enableShare='+$scope.enableConfiguratorOption +'&enableShare='+$scope.enableChartsOption
            +'" scrolling="no"  width="100%" height="700px" style="border:none;"></iframe>';
    }
});






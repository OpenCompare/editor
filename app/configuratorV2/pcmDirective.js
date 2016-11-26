app.controller('pcmController', function($scope, $http, $q, $sce, pcmApi, $timeout, openCompareServer) {

}).directive('pcm', function() { //pcm directive
	return {
		restrict: 'E',
		controller: 'pcmController',
		templateUrl: 'configuratorV2/pcmDirective.html',
		scope: {
			features: "=",
      products: "="
		}
	};
});

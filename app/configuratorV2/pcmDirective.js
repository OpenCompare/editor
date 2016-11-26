app.directive('pcm', function() { //pcm directive
	return {
		restrict: 'E',
		templateUrl: 'configuratorV2/pcmDirective.html',
		scope: {
			features: "=",
      products: "="
		}
	};
});

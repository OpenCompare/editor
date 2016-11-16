//app is the angular module
app.controller('configuratorController', function($scope, $http, $q, $sce, pcmApi, $timeout, openCompareServer) { //Configurator controller ONLY for the directive configurator you never have to type ng-controller="configuratorController" anywhere
	
	//Controller functions
	$scope.getCell = function(product, feature){
		//Return the cell from the product corresponding to the feature
		var cell = false;
		for(var i=0;i<product.cells.size();i++){
			if(product.cells.get(i).feature.name == feature.name){
				cell = product.cells.get(i);
				break;
			}
		}
		return cell;
	}
	
	$scope.loadPCM = function(pcmID){
		/*
		load pcm from api
		pcmID is obtional if not specified it load $scope.pcmID
		else it set $scope.pcmID with pcmID and load it
		*/
		pcmID = pcmID || false;
		if(pcmID){
			$scope.pcmID = pcmID;
		}
		
		$http.get("https://opencompare.org/api/get/" + $scope.pcmID).success(function(data) {
			metadata = data.metadata; //Get metadata
			pcm = pcmApi.loadPCMModelFromString(JSON.stringify(data.pcm)); //Load PCM
			pcmApi.decodePCM(pcm); //Decode the PCM with KMF, require pcmApi
			
			$scope.metadata = metadata;
			$scope.pcm = pcm;
			
			//Push all features in $scope.features
			$scope.features = [];
			for (var i = 0; i < pcm.features.size(); i++) {
				$scope.features.push(pcm.features.get(i));
			}
			
			$scope.products = [];
			$scope.displayedProducts = [];
			for (var i = 0; i < pcm.products.size(); i++) {
				$scope.products.push(pcm.products.get(i));
				$scope.displayedProducts.push(pcm.products.get(i));
			}
			
			/*console.log("PCM metadata :");
			console.log($scope.metadata);
			console.log("PCM :");
			console.log($scope.pcm);*/
        });
	}
	
	$scope.loadPCM(); //Load the pcm
	
}).directive('configurator', function() { //Configurator directive
	/*
	* HOW TO USE IT :
	* <configurator pcm="pcmID"><configurator>
	* Example :
	* <configurator pcm="581b5527975a1109cf560e4b"></configurator>
	* Will load the pcm with the id 581b5527975a1109cf560e4b
	*/
	return {
		restrict: 'E', //The element name has to be the directive name : <configurator pcm="id du pcm dans l'api"></configurator>
		controller: 'configuratorController', //Use the controller configuratorController in the directive
		templateUrl: 'configuratorV2/configuratorV2.html', //Template file the the directive
		scope: {
			pcmID: "@pcm" //Get pcm id from the attribute pcm in the element : <configurator pcm="pcmID"></configurator>
		}
	};
});
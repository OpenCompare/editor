//app is the angular module
app.controller('configuratorController', function($scope, $http, $q, $sce, pcmApi, $timeout, openCompareServer) { //Configurator controller ONLY for the directive configurator you never have to type ng-controller="configuratorController" anywhere

	$scope.metadata = false; //Contains metadata about pcm (license, source)
	$scope.pcm = false; //Contains the pcm
	$scope.features = []; //Contains all features of the pcm
	$scope.products = []; //Contains all products from the pcm

	//Controller objects
	function Filter(feature, products){
		this.feature = feature;
		this.values = [];
		this.matchValue = {};
		this.min = false; //Minimum value in all values
		this.max = false; //Maximum value in all values
		this.lower = false; //Minimum value which match filter
		this.upper = false; //Maximum value which match filter
		this.step = 1; //Step for the slider when feature is a numeric value
		this.type = "undefined";
		this.value = "";

		//Determine type of feature
		var integer = 0;
		var float = 0;
		var string = 0;
		for(var p=0; p<products.length; p++){
			var content = $scope.getCell(products[p], feature).content;

			if($.inArray(content, this.values)==-1){
				this.values.push(content);
			}

			if(/^\d+$/.test(content)){
				integer++;
			}else if(/^\d+\.\d+$/.test(content)){
				float++;
			}else{
				string++;
			}
		}

		if(float==0 && string==0){
			this.type = "integer";

			for(var v in this.values){
				var value = parseInt(this.values[v], 10);
				if(!this.min && !this.max){
					this.min = value;
					this.max = value;
				}else if(value<this.min){
					this.min = value;
				}else if(value>this.max){
					this.max = value;
				}
			}
			this.lower = this.min;
			this.upper = this.max;
		}else if(string==0){
			this.type = "float";

			for(var v in this.values){
				var value = parseFloat(this.values[v]);
				if(!this.min && !this.max){
					this.min = value;
					this.max = value;
				}else if(value<this.min){
					this.min = value;
				}else if(value>this.max){
					this.max = value;
				}
			}
			this.lower = this.min;
			this.upper = this.max;
			this.step = 0.1;
		}else{
			this.type = "string";

			for(var v in this.values){
				this.matchValue[this.values[v]] = true;
			}
		}

		console.log("typeof "+this.feature.name+" = "+this.type);
	}

	Filter.prototype.getHTML = function(){
		var html = "";
		if(this.type=="string"){
			html = "<oc-checkbox feature='feature'></oc-checkbox>";
		}else{
			html = "<oc-slider feature='feature'></oc-slider>";
		}
		return $sce.trustAsHtml(html);
	}

	Filter.prototype.match = function(cell){
		return 	this.type=="integer" && parseInt(cell.content, 10)>=this.lower && parseInt(cell.content, 10)<=this.upper ||
				this.type=="float" && parseFloat(cell.content)>=this.lower && parseFloat(cell.content)<=this.upper ||
				this.type=="string" && this.matchValue[cell.content];
	}

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
			$scope.metadata = data.metadata; //Get metadata
			$scope.pcm = pcmApi.loadPCMModelFromString(JSON.stringify(data.pcm)); //Load PCM
			pcmApi.decodePCM($scope.pcm); //Decode the PCM with KMF, require pcmApi

			//Push all products in $scope.products
			$scope.products = [];
			for (var i = 0; i < $scope.pcm.products.size(); i++) {
				$scope.products.push($scope.pcm.products.get(i));
			}

			//Push all features in $scope.features
			$scope.features = [];
			for (var i = 0; i < $scope.pcm.features.size(); i++) {
				var feature = $scope.pcm.features.get(i);
				feature.filter = new Filter(feature, $scope.products); //filter is used to filter products on this feature
				$scope.features.push(feature);
			}

			/*console.log("PCM metadata :");
			console.log($scope.metadata);
			console.log("PCM :");
			console.log($scope.pcm);*/
        });
	}

	$scope.loadPCM(); //Load the pcm

}).filter("productSearch", function(){
	//Return products matching filter of each features
	//products : list of all products
	//getCell : function from configuratorController
	//features : list of all features
	return function(products, getCell, features){
		var displayedProducts = []; //List of products matching filters

		for(var p=0; p<products.length; p++){
			var match = true;
			for(var f=0; f<features.length; f++){
				if(features[f].filter.match(getCell(products[p], features[f]))==false){
					match = false; //If the product doesn't match the filter of one of the feature it isn't added to displayedProducts
					break;
				}
			}

			if(match){
				displayedProducts.push(products[p]);
			}
		}
		return displayedProducts;
	};
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

//Directives to select products to match
app.directive('ocSlider', function() {
    return {
		restrict:"E",
        scope: {
			feature: "="
		},
    //    template: '{{feature.name}}<div class="range-slider-display">{{feature.filter.lower}}</div><div style="display:inline-block;width: calc(100% - 100px);"><range-slider lower-value="{{feature.filter.lower}}" upper-value="{{feature.filter.upper}}" min-gap="1" step="1" min="{{feature.filter.min}}" max="{{feature.filter.max}}"></range-slider></div><div class="range-slider-display">{{feature.filter.upper}}</div>'
				template: '{{feature.name}}<div class="range-slider-display">{{feature.filter.lower}}</div><div style="display:inline-block;width: calc(100% - 100px);"><range-slider lower-value="feature.filter.lower" upper-value="feature.filter.upper" min-gap="1" step="feature.filter.step" min="feature.filter.min" max="feature.filter.max" ></range-slider></div><div class="range-slider-display">{{feature.filter.upper}}</div>'

		};
});


app.directive('ocCheckbox', function() {
    return {
		restrict:"E",
        scope: {
            feature: "="
        },
        template: '{{feature.name}}<div flex-gt-sm="50" ng-repeat="n in feature.filter.values"><md-checkbox md-no-ink aria-label="Checkbox No Ink" ng-model="feature.filter.matchValue[n]" class="md-primary">{{n}}</md-checkbox></div>'
    };
});

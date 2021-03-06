//app is the angular module
app.controller('configuratorController', function($scope, $http, $q, $sce, pcmApi, $timeout, openCompareServer) { //Configurator controller ONLY for the directive configurator you never have to type ng-controller="configuratorController" anywhere

	//UI var
	$scope.configuratorStyle = {"width": "200px"};
	$scope.pcmWrapStyle = {"width": "calc(100% - 200px)"};

	$scope.configuratorShow = true;
	$scope.configuratorArrow = "configurator-arrow"; //Class of the arrow on the hide/show configurator button
	$scope.configuratorHideShowMessage = "Hide configurator"; //Display the actionof the hide/show configurator button

	//datas
	$scope.metadata = false; //Contains metadata about pcm (license, source)
	$scope.pcm = false; //Contains the pcm
	$scope.features = []; //Contains all features of the pcm
	$scope.products = []; //Contains all products from the pcm

	//********************************************************************************************************************************************************************
	//Filter object
	function Filter(feature, products){
		this.feature = feature;
		this.values = []; //Contains all values for this feature
		this.matchValue = {}; //For each value associate a boolean that say if the value match the filter
		this.min = false; //Minimum value in all values
		this.max = false; //Maximum value in all values
		this.lower = false; //Minimum value which match filter
		this.upper = false; //Maximum value which match filter
		this.step = 1; //Step for the slider when feature is a numeric value
		this.type = "undefined"; //Type of the values : Integer, Float, String
		this.value = ""; //Will contain a regexp entered by the user in a search form, TODO

		//Determine type of feature
		var integer = 0;
		var float = 0;
		var string = 0;
		for(var p=0; p<products.length; p++){
			var content = products[p].getCell(feature).content;

			if($.inArray(content, this.values)==-1){
				this.values.push(content);
			}

			if(content.length>0){
				if(/^\d+$/.test(content)){
					integer++;
				}else if(/^\d+\.\d+$/.test(content)){
					float++;
				}else{
					string++;
				}
			}
		}

		//Determine the type of the feature
		if(integer>0 && float==0 && string==0){ //Integer
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
		}else if(float>0 && string==0){ //Float
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
		}else{ //Stirng
			this.type = "string";

			this.values.sort();

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

	//********************************************************************************************************************************************************************
	//UI functions
	$scope.configuratorHideShow = function(){
		// hide or show the cofigurator
		$scope.configuratorShow = !$scope.configuratorShow;

		if($scope.configuratorShow){
			$scope.configuratorStyle = {"width": "200px"};
			$scope.pcmWrapStyle = {"width": "calc(100% - 200px)"};
			$scope.configuratorArrow = "configurator-arrow";
			$scope.configuratorHideShowMessage = "Hide configurator";
		}else{
			$scope.configuratorStyle = {"width": "0", "border-width": "0"};
			$scope.pcmWrapStyle = {"width": "100%"};
			$scope.configuratorArrow = "configurator-arrow right";
			$scope.configuratorHideShowMessage = "Show configurator";
		}

	}

	//********************************************************************************************************************************************************************
	//PCM functions
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
			console.log(data);
			pcmApi.decodePCM($scope.pcm); //Decode the PCM with KMF, require pcmApi

			//Push all products in $scope.products
			$scope.products = [];
			for (var i = 0; i < $scope.pcm.products.size(); i++) {
				var product = $scope.pcm.products.get(i);

				product.getCell = function(feature){
					//Return the cell corresponding to the feature
					var cell = false;
					for(var i=0;i<this.cells.size();i++){
						if(this.cells.get(i).feature.name == feature.name){
							cell = this.cells.get(i);
							break;
						}
					}
					return cell;
				}

				$scope.products.push(product);
			}

			//Push all features in $scope.features
			$scope.features = [];
			for (var i = 0; i < $scope.pcm.features.size(); i++) {
				var feature = $scope.pcm.features.get(i);
				feature.filter = new Filter(feature, $scope.products); //filter is used to filter products on this feature
				if($scope.pcm.productsKey.generated_KMF_ID == feature.generated_KMF_ID){
					$scope.features.splice(0, 0, feature);
				}else{
					$scope.features.push(feature);
				}
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
	//features : list of all features
	return function(products, features){
		var displayedProducts = []; //List of products matching filters

		for(var p=0; p<products.length; p++){
			var match = true;
			for(var f=0; f<features.length; f++){
				if(features[f].filter.match(products[p].getCell(features[f]))==false){
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

//********************************************************************************************************************************************************************
//Directives to select products to match
app.directive('ocSlider', function() {
    return {
		restrict:"E",
        scope: {
			feature: "="
		},
    //    template: '{{feature.name}}<div class="range-slider-display">{{feature.filter.lower}}</div><div style="display:inline-block;width: calc(100% - 100px);"><range-slider lower-value="{{feature.filter.lower}}" upper-value="{{feature.filter.upper}}" min-gap="1" step="1" min="{{feature.filter.min}}" max="{{feature.filter.max}}"></range-slider></div><div class="range-slider-display">{{feature.filter.upper}}</div>'
				template: '<div class="range-slider-display">{{feature.filter.lower}}</div><div style="display:inline-block;width: calc(100% - 100px);"><range-slider lower-value="feature.filter.lower" upper-value="feature.filter.upper" min-gap="1" step="feature.filter.step" min="feature.filter.min" max="feature.filter.max" ></range-slider></div><div class="range-slider-display">{{feature.filter.upper}}</div>'

		};
});


app.directive('ocCheckbox', function() {
    return {
		restrict:"E",
        scope: {
            feature: "="
        },
        template: '<div flex-gt-sm="100" ng-repeat="n in feature.filter.values"><md-checkbox md-no-ink aria-label="Checkbox No Ink" ng-model="feature.filter.matchValue[n]" class="md-primary">{{n}}</md-checkbox></div>'
    };
});

//********************************************************************************************************************************************************************
//Feature controller and directive
app.controller('ocFeatureController', function($scope) {
	$scope.show = false;
	$scope.contentHeight = 0;
	$scope.style = {"height": $scope.contentHeight+"px"};
	$scope.arrow = "feature-arrow";

	$scope.toggleShow = function(){
		$scope.show = !$scope.show;
		if($scope.show){
			$scope.contentHeight = $scope.element[0].querySelector('.feature-content').offsetHeight;
			$scope.style = {"height": $scope.contentHeight+"px"};
			$scope.arrow = "feature-arrow bottom";
		}else{
			$scope.contentHeight = 0;
			$scope.style = {"height": $scope.contentHeight+"px"};
			$scope.arrow = "feature-arrow";
		}
	}
});

app.directive('ocFeature' ,function() {
	    return {
			restrict:"E",
			controller: "ocFeatureController",
			scope: {
				feature: "="
			},
      template: '<div class="feature">'+
				'<button class="feature-button" ng-click="toggleShow()"><div ng-class="arrow"></div> {{feature.name}}</button>'+ //Button to expand content
				'<div class="feature-content-wrap" ng-style="style">' + //Content wrap
					'<div class="feature-content">'+ //Content
						'<div ng-if="feature.filter.values.length==1">{{ feature.filter.values[0] }}</div>'+ //Only one value
						'<oc-checkbox feature="feature" ng-if="feature.filter.values.length>1 && feature.filter.type==\'string\'"></oc-checkbox>'+ //Checkbox
						'<oc-slider feature="feature" ng-if="feature.filter.values.length>1 && feature.filter.type!=\'string\'"></oc-slider>'+ //Slider
					'</div>'+ //Close content
				'</div>' + //Close content wrap
			'</div>', //Close feature
			link: function($scope, element, attrs){
				$scope.element = element; //To access to the element inside the controller
			}
    };
});

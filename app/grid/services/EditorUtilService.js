/**
 * Created by hvallee on 7/2/15.
 */


angular
  .module('openCompareEditor')
  .service('editorUtil', function($rootScope) {

    this.getCellClass = function (value, featureType) {
      if(value && featureType == 'bool') {
        if(value.toLowerCase().indexOf('yes') != -1 || value.toLowerCase().indexOf('oui') != -1) {
          return 'yesCell';
        }
        else if(value.toLowerCase().indexOf('dunno') == -1 && (value.toLowerCase().indexOf('no') != -1 || value.toLowerCase().indexOf('non') != -1)) {
          return 'noCell';
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    };

    this.getFeaturesFromArray = function(data) {
      var features = [];
      data.forEach(function (product) {
        for(var feature in product) {
          if(features.indexOf(feature) == -1 && feature != '$$hashKey') {
            features.push(feature);
          }
        }
      });
      return features;
    };

    this.getCellTooltip  = function(value) {

      if(value) {
        if(value.toLowerCase().indexOf('<ref') != -1) {
          var index = value.toLowerCase().indexOf('<ref');
          var refPart = value.substring(index+11);
          var endIndex = refPart.replace(/\s/g, '').indexOf('"/>');
          return refPart.substring(0, endIndex);
        }
        else if(value.toLowerCase().indexOf('<ref>{{') != -1) {
          var index = value.toLowerCase().indexOf('<ref>{{');
          var refPart = value.substring(index+11);
          var endIndex = refPart.replace(/\s/g, '').indexOf('}}</ref>');
          return refPart.substring(0, endIndex);
        }
        else if(value.toLowerCase().indexOf('<ref>{{') != -1) {
          var index = value.toLowerCase().indexOf('<ref>{{');
          var refPart = value.substring(index+11);
          var endIndex = refPart.replace(/\s/g, '').indexOf('}}</ref>');
          return refPart.substring(0, endIndex);
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }

    };


    this.convertStringToEditorFormat = function(name) {

      return name.replace(/\(/g, '%28').replace(/\)/g, '%29');
    };

    this.convertStringToPCMFormat = function(name) {

      return name.replace(/%28/g, '(').replace(/%29/g, ')');
    };

    this.sortFeatures = function(features, columns, positions){
      function getFeaturePosition(name) {
        var featurePosition = -1;
        positions.forEach(function (position) {
          var featureName = "";
          features.forEach(function (feature) {
            if (feature.generated_KMF_ID === position.feature) {
              featureName = feature.name;
            }
          });

          if (featureName === name) {
            featurePosition = position.position;
          }
        });
        return featurePosition;
      }

      var sortedColumns = columns.sort(function(column1, column2) {
        var pos1 = getFeaturePosition(column1.name);
        var pos2 = getFeaturePosition(column2.name);

        if(pos1 == -1) {
          return 1;
        }
        else if(pos2 == -1) {
          return -1;
        }
        else {
          return pos1 - pos2;
        }
      });

      return sortedColumns;
    };



    this.findMinAndMax = function(featureName, data) {

      var min = 0;
      var max = 0;
      data.forEach(function (product) {
        if(parseInt(product[featureName]) > max) {
          max = parseFloat(product[featureName].replace(/\s/g, "").replace(",", "."));
        }
        if(parseInt(product[featureName]) < min) {
          min = parseFloat(product[featureName].replace(/\s/g, "").replace(",", "."));
        }
      });
      return [min, max];
    };


    this.isEmptyCell = function(name) {

      return (!name.toLowerCase()
      || name.toLowerCase() == ""
      || name.toLowerCase() == "N/A"
      || name.toLowerCase() == "?"
      || name.toLowerCase() == "unknown");
    };

    this.checkIfNameExists = function(name, columns) {

      var newName = "";
      if(!name) {
        newName = "New Feature";
      }
      else {
        newName = name;
      }
      var index = 0;
      columns.forEach(function(featureData) {
        var featureDataWithoutNumbers = featureData.name.replace(/[0-9]/g, '');
        if(featureDataWithoutNumbers === newName ){
          index++;
        }
      });
      if(index != 0) {
        newName = newName + index;
      }
      return newName;
    };

    this.GetUrlValue = function(VarSearch){
      var SearchString = document.location.search.substring(1);
      var VariableArray = SearchString.split('&');
      for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
          return KeyValuePair[1];
        }
      }
    };

    this.getNumberOfFeaturesWithThisFeatureGroup = function(cols, featureGroup) {
      var count = 0;
      for(var i = 0; i < cols.length; i++) {
        if(cols[i].superCol == featureGroup) {
          count ++;
        }
      }
      return count;
    };


    this.goToCell = function(row, col)
    {
      $rootScope.$broadcast('goToCell', {row: row, col: col});
    }

  });

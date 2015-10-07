angular
  .module('openCompareEditor')
  .service('componentUtils', function() {

    this.defineOption = function(config, optionPath, defaultValue) {
      var currentObj = config;

      // Define structure if necessary
      for (var i = 0; i < optionPath.length - 1; i++) {
        var obj = currentObj[optionPath[i]];

        if (typeof obj === 'undefined') {
          obj = {};
        }
        currentObj = obj;
      }

      // Assign default value if not already defined
      var option = optionPath[optionPath.length - 1];
      if (typeof currentObj[option] === 'undefined') {
        currentObj[option] = defaultValue;
      }

    }


  });

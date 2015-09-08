/**
 * Created by hvallee on 7/23/15.
 */

angular
  .module('openCompareEditor')
  .service('featureGroupService', function() {

    var currentFeatureGroup = '';

    this.setCurrentFeatureGroup = function(featureGroup) {
        currentFeatureGroup = featureGroup;
    };

    this.getCurrentFeatureGroup = function() {
        return currentFeatureGroup;
    };



});

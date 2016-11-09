
angular
  .module('openCompareEditorApp', []).service('getPCM', function($http) {

   return $http.get('foopcm1.json');
 }

 );
 // ...

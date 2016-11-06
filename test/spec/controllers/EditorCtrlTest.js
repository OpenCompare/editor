'use strict';

describe('Controller: EditorCtrl', function () {



  // load the controller's module
  //beforeEach(module('openCompareEditor'));

  beforeEach(module("openCompareEditorApp"));


 var controller;
 var scope = {};

  // Initialize the controller and a mock scope

  beforeEach(inject(function ($injector) {


    controller = $injector.get('$controller');
    //scope = $injector.get('rootScope').$new();
    //controller = $_controller_('TestCtrl', {
      //scope: scope
      // place here mocked dependencies
    //});
  }));




  it('do nothing', inject(function ($rootScope, $httpBackend, $timeout) {
    //expect(controller..length).toBe(3);

   //$httpBackend.whenGET("foopcm1.json").passThrough();
   //    $httpBackend.flush();

   console.log('Hello, world!');

   var a = true;
   expect(a).toBe(true);


   /*$httpBackend.whenGET("foopcm1.json").respond(function(method, url, data, headers, params) {
          console.log('data ' + data);
          return data;
    });*/



   var scope = $rootScope.$new();
   var controllerBis = controller('TestCtrl', { $scope: scope });


   console.log('State: ' + scope.myState.saved);

   // TODO: fix timeout issue
   //$httpBackend.flush();
   $timeout.flush();


   console.log('PCM container: ' + scope.myPCMContainer);
   console.log('PCM: ' + scope.myPCMContainer.pcm);
   console.log('PCM: ' + scope.myPCMContainer.pcm.name);




  }));
});

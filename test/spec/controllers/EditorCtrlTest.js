'use strict';

describe('Controller: EditorCtrl', function () {



  // load the controller's module
  //beforeEach(module('openCompareEditor'));

  beforeEach(module("openCompareEditorApp"));


 var controller;
 var scope = {};
  var pcmFileLocation = 'test/foopcm2.json';
  // Initialize the controller and a mock scope

  beforeEach(inject(function ($injector, $rootScope) {


    controller = $injector.get('$controller');
    //scope = $injector.get('rootScope').$new();
    scope = $rootScope.$new();

   // var scope = $rootScope.$new();
    scope.pcmLocation = pcmFileLocation;
    scope.$apply();
    controller ('TestCtrl', { $scope: scope });
    //controller = $_controller_('TestCtrl', {
      //scope: scope
      // place here mocked dependencies
    //});
  }));




  it('works for foopcm1', inject(function ($rootScope, $httpBackend, $timeout) {
    //expect(controller..length).toBe(3);

   //$httpBackend.whenGET("foopcm1.json").passThrough();
   //    $httpBackend.flush();

   console.log('Hello, world!');

   var a = true;
   expect(a).toBe(true);


   $httpBackend.whenGET("" + pcmFileLocation).respond(readJSON('app/' + pcmFileLocation));

  // var controllerBis = controller('TestCtrl', { $scope: scope });


   console.log('State: ' + scope.myState.saved);
    console.log('pcmLocation: ' + scope.pcmLocation);

   // TODO: fix timeout issue
   $httpBackend.flush();
   $timeout.flush();


   console.log('PCM container: ' + scope.myPCMContainer);
   console.log('PCM: ' + scope.myPCMContainer.pcm);
   console.log('PCM: ' + scope.myPCMContainer.pcm.name);




  }));
});

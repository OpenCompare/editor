'use strict';

describe('Controller: EditorCtrl', function () {



  // load the controller's module
  //beforeEach(module('openCompareEditor'));
  beforeEach(module("openCompareEditorApp"));


  var controller;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope) {
    controller = $injector.get('$controller');
  }));



  it('works for foopcm1', inject(function ($rootScope, $httpBackend, $timeout) {
   var pcmFileLocation = 'test/foopcm2.json';
   var scope = $rootScope.$new();
   scope.pcmLocation = pcmFileLocation;
   scope.myConfig = {'serverMode': "local" };

   controller('TestCtrl', { $scope: scope });

   $httpBackend.whenGET("" + pcmFileLocation).respond(readJSON('app/' + pcmFileLocation));

   expect(scope.isComingFromTest).toBe(true);

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

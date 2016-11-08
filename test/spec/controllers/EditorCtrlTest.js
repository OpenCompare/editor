'use strict';

describe('Controller: EditorCtrl', function () {



  // load the controller's module
  //beforeEach(module('openCompareEditor'));
  beforeEach(module("openCompareEditorApp"));


  var controller;
  var scope = {};
  var pcmFileLocation = 'test/foopcm2.json'; // scope.myConfig.pcmlocation; 'test/foopcm2.json'



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $rootScope) {
    controller = $injector.get('$controller');

    //scope.pcmLocation = pcmFileLocation;
    scope.myConfig = $rootScope.$new();
    scope.myConfig.serverMode = "local";
    // choose / FIX
    scope.myConfig.pcmlocation = pcmFileLocation;
    scope.pcmlocation = pcmFileLocation;

    controller('TestCtrl', { $scope: scope });


  }));



  it('works for foopcm1', inject(function ($rootScope, $httpBackend, $timeout) {


    expect(scope.isComingFromTest).toBe(true);

    $httpBackend.whenGET("" + pcmFileLocation).respond(readJSON('app/' + pcmFileLocation));


    console.log('State: ' + scope.myState.saved);
    console.log('pcmLocation: ' + pcmFileLocation);

    // TODO: fix timeout issue
    $httpBackend.flush();
    $timeout.flush();


    console.log('PCM container: ' + scope.myPCMContainer);
    console.log('PCM: ' + scope.myPCMContainer.pcm);
    console.log('PCM: ' + scope.myPCMContainer.pcm.name);





  }));


/*
  it('works for remote', inject(function ($rootScope, $httpBackend, $timeout, openCompareServer) {


    var scope = $rootScope.$new();
    scope.myConfig = {};
    scope.myConfig.serverMode = "remote";
    scope.myConfig.serverAddress = "http://localhost:9000";
    scope.myConfig.id = "581b53b38d6a4d31e94f5d38";
    scope.$apply();

    console.log('serverMode : ' + scope.myConfig.serverMode);
    controller('TestCtrl', { $scope: scope });

   $httpBackend.whenGET(scope.myConfig.serverAddress + "/api/get/" + scope.myConfig.id).respond(
      openCompareServer.get("/api/get/" + scope.myConfig.id)
   );


   console.log('State: ' + scope.myState.saved);
   console.log('pcmLocation: ' + scope.pcmLocation);
     console.log('myConfig : ' + scope.myConfig.serverMode);

   // TODO: fix
   try {
     $httpBackend.flush();
     console.log('PCM container: ' + scope.myPCMContainer);
     console.log('PCM: ' + scope.myPCMContainer.pcm);
     console.log('PCM: ' + scope.myPCMContainer.pcm.name);
   }
   catch (e) {
     // console.log(e);
   }



 }));*/


});

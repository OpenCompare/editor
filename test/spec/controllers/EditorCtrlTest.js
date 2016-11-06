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




  it('do nothing', inject(function ($httpBackend, $timeout) {
    //expect(controller..length).toBe(3);



    console.log('Hello, world!');

    var a = true;
    expect(a).toBe(true);

    var pcm = {};
    //$httpBackend.whenGET("foopcm1.json").passThrough();

    var timeout = {};
    var controllerBis = controller('TestCtrl', { $scope: scope });

//    $httpBackend.flush();

    console.log('State: ' + scope.myState.saved);
    // TODO: fix timeout issue


    console.log('PCM: ' + scope.myPCMContainer.pcm);
    console.log('PCM: ' + scope.myPCMContainer.pcm.name);


    $timeout.flush();




  }));
});

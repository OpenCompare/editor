'use strict';

describe('Controller: EditorCtrl', function () {



  // load the controller's module
  //beforeEach(module('openCompareEditor'));

  beforeEach(module("openCompareEditorApp"));

  var controller;


  // Initialize the controller and a mock scope

  beforeEach(inject(function (_$controller_) {
    controller = _$controller_;
    //$scope = $rootScope.$new();
    //controller = $_controller_('TestCtrl', {
      //scope: scope
      // place here mocked dependencies
    //});
  }));

  


  it('do nothing', inject(function ($timeout) {
    //expect(controller..length).toBe(3);
    console.log('Hello, world!');
    var a = true;

    expect(a).toBe(true);

    var scope = {};
    var timeout = {};
    var controllerBis = controller('TestCtrl', { $scope: scope });
    console.log('State: ' + scope.myState.saved);
    // TODO: fix timeout issue
    $timeout.flush();
    console.log('PCM: ' + scope.myPCMContainer.pcm);
    console.log('PCM: ' + scope.myPCMContainer.pcm.name);


  }));
});

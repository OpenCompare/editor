'use strict';

describe('Controller: EditorCtrl', function () {



  // load the controller's module
  //beforeEach(module('openCompareEditor'));

  beforeEach(module("openCompareEditor"));

  var controller;
  var scope;

  // Initialize the controller and a mock scope

  beforeEach(inject(function (_$controller_) {
    controller = _$controller_;
    //$scope = $rootScope.$new();
    //controller = $_controller_('TestCtrl', {
      //scope: scope
      // place here mocked dependencies
    //});
  }));


  it('do nothing', function () {
    //expect(controller..length).toBe(3);
    console.log('Hello, world!');
    var a = true;

    expect(a).toBe(true);
  });
});

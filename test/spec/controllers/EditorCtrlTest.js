'use strict';

describe('Controller: EditorCtrl', function () {

  var controller;
  var scope;

  // load the controller's module
  beforeEach(module('openCompareEditor'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('EditorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('do nothing', function () {
    //expect(controller..length).toBe(3);
  });
});

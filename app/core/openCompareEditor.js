'use strict';


/* Move object in array */
Array.prototype.move = function (old_index, new_index) {

  if (new_index >= this.length) {
    var k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  return this;
};

/**
 * @ngdoc overview
 * @name openCompareEditor
 * @description
 * # editorApp
 *
 * Main module of the application.
 */
angular.module('openCompareEditor', [
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.selection',
    'ui.grid.cellNav',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.autoResize',
    'ui.bootstrap',
    'ui.slider',
    'ui.grid.pinning',
    'chart.js',
    'pascalprecht.translate',
    'ab-base64',
    'naif.base64',
    'angular-clipboard'
  ]);

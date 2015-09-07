'use strict';

/**
 * @ngdoc overview
 * @name openCompareEditor
 * @description
 * # editorApp
 *
 * Main module of the application.
 */
angular
  .module('openCompareEditor', [
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
    'naif.base64'
  ]);

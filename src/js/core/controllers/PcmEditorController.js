/**
 * Created by hvallee on 8/3/15.
 */

var pcmEditor = angular.module('pcmEditor', ['ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.autoResize',
    'ui.bootstrap','ui.grid.pinning']);

pcmEditor.controller('editorCtrl', ['$scope', 'editorData', 'editorSetup', function($scope, editorData, editorSetup) {

    var truc = [{"name":"pasilla", "spiciness":"mild"},
        {"name":"jalapeno", "spiciness":"hot hot hot!"},
        {"name":"habanero", "spiciness":"LAVA HOT!!"}];

    editorData.data = truc;

    $scope.gridOptions = {
        //headerTemplate: '/assets/templates/featureGroupHeader.html',
        superColDefs: [],
        columnDefs: [],
        data: editorData.data,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        flatEntityAccess: true,
        enableColumnResizing: true,
        enableFiltering: true,
        enableCellSelection: false,
        enableCellEdit: false,
        headerRowHeight: 60,
        rowHeight: 30
    };

    /* Register grid functions */
    $scope.gridOptions.onRegisterApi = function(gridApi){


        //set gridApi on scope
        $scope.gridApi = gridApi;


        /* Called when columns are moved */
        gridApi.colMovable.on.columnPositionChanged($scope,function(colDef, originalPosition, newPosition){
            for(var fct in editorSetup.columnPositionChangedFunctions) {
                fct(colDef, originalPosition, newPosition);
            }
        });

        /* Called when begin editing a cell */
        gridApi.edit.on.beginCellEdit($scope, function(rowEntity, colDef) {
            for(var fct in editorSetup.beginCellEditFunctions) {
                fct(rowEntity, colDef);
            }
        });

        /* Called after an edition */
        gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            for(var fct in editorSetup.afterCellEditFunctions) {
                fct(rowEntity, colDef, newValue, oldValue);
            }
        });

        /* Called when navigate to cells */
        gridApi.cellNav.on.navigate($scope,function(rowEntity, colDef){
            for(var fct in editorSetup.navigateFunctions) {
                fct(rowEntity, colDef);
            }
        });

        /* Called when resizing a column */
        gridApi.colResizable.on.columnSizeChanged($scope,function(colDef, deltaChange){
            for(var fct in editorSetup.columnSizeChangedFunctions) {
                fct(colDef, deltaChange);
            }
        })

    };
}]);
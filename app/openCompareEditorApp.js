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
  .module('openCompareEditorApp', ['openCompareEditor'])
  // getPCM (service)
  .controller('TestCtrl', function($scope, $http, $q, $sce, pcmApi, $timeout, openCompareServer) {

    $scope.myPCMContainer = {

    };

    $scope.myState = {
      //edit: true,
      saved: true
    };

      $scope.misc = 'MISC';


  $scope.launchOCEditor = function() {

    ////// With Local PCM in an external JSON //////
    if ($scope.myConfig.serverMode === "local") {

      var pcmLocation = $scope.myConfig.pcmlocation ;
      var canceler = $q.defer();
      if (pcmLocation.length > 0) {
        $http.get(pcmLocation).success(function(data) {
              var myPcm = data.pcm;
              var container = {};
              container.pcm = pcmApi.loadPCMModelFromString(JSON.stringify(myPcm));
              container.metadata = data.metadata;

              // container.pcm = pcmApi.loadPCMModelFromString(JSON.stringify(container.pcm));
              pcmApi.decodePCM(container.pcm);

              $timeout(function() {
                $scope.myPCMContainer.pcm = container.pcm;
                $scope.myPCMContainer.metadata = container.metadata;

                $scope.buildHTML(container.pcm);
               //$scope.csvApi.open();
               //$scope.htmlApi.open();
               //$scope.mediaWikiApi.open();
             }, 1000);
         });
       }

     }

    ////// With OpenCompare Server (remote) //////
    if ($scope.myConfig.serverMode === "remote") {

        openCompareServer.useRemoteServer($scope.myConfig.serverAddress);

        var id = $scope.myConfig.id;
        if (typeof id !== 'undefined') {
        //   /* Load a PCM from database */
           $scope.id = id;
           $scope.loading = true;
           //$scope.setEdit(false, false);
           //$scope.updateShareLinks();
           openCompareServer.get("/api/get/" + $scope.id).
           then(function (response) {
             var data = response.data;
             var pcm = pcmApi.loadPCMModelFromString(JSON.stringify(data.pcm));
             pcmApi.decodePCM(pcm); // Decode PCM from Base64

             $scope.myPCMContainer.pcm = pcm;
             $scope.myPCMContainer.metadata = data.metadata;
             $scope.myPCMContainer.id = id;
             $scope.myState.saved = true;

           }, function(error) {
             console.log(error);
           })
             .finally(function () {
               $scope.loading = false;
             })
         }
      }
    };

    $scope.buildHTML = function(lpcm) {

      // TODO: as a directive
      // as a DOM
      var html = "<table>";

      // we first print features (headers)
      html += "<tr>";
      var nFts = lpcm.features.size();
      for (var i = 0; i < nFts; i++) {
          var ft = lpcm.features.get(i);
          html += "<th>" + ft.name + "</th>";
      }
      html += "</tr>";

      // for each product, we print the row
      // we iterate over each features (same order) and seek product cells whose features correspond
      // I think it would be nice to have an API facility like: p.cells(ftName)
      for (var i = 0; i < lpcm.products.size(); i++) {
          var p = lpcm.products.get(i);
          var pCells = p.cells;
      		html += "<tr>";
    		  for (var j = 0; j < lpcm.features.size(); j++) {
            var f = lpcm.features.get(j);
            for (var k = 0; k < pCells.size(); k++) {
    			       var c = pCells.get(k);
                 if(c.feature.name === f.name) {
                      //  console.log('same feature name: ' +  f.name + ' (cell: ' + c.content + ')');
               					html += "<td>" + c.content + "</td>";
               		}
    				}
          }
          html += "</tr>";
      }



    	html += "</table>";

      console.log('HTML ' + html);
    	$scope.misc = $sce.trustAsHtml(html);
        // $("body").html(html);

    };





    /////////
    $scope.myConfig = {
      serverMode: 'local', // "remote" is the other mode
      pcmlocation: 'test/foopcm2.json' // example
    };

    // example with remote mode
    /*
        $scope.myConfig = {
          serverMode: 'remote', // "remote" is the other mode
          serverAddress: 'http://localhost:9000',
          id: "57d95c75d4c6850adb590f06" //"581b53b38d6a4d31e94f5d38"
        };*/

    $scope.launchOCEditor();
    //$scope.htmlApi.open();




  }).directive('miscpcm', function() {
  return {
    templateUrl: 'templates/sandbox.html'
  };
  })

  ;

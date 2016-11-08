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
  .controller('TestCtrl', function($scope, $http, $q, pcmApi, $timeout, openCompareServer) {
    console.log('cioucou');
    console.log('cioucou http' + $http);

    $scope.myPCMContainer = {

    };

    $scope.myState = {
      //edit: true,
      saved: true
    };

    $scope.isComingFromTest = false;

  //  $scope.pcmLocation = ''; // 'test/foopcm1.json';



    $scope.myConfig = {
      serverMode: "local" // remote is the alternative 
    };

    ////// With Local PCM in an external JSON //////
    if ($scope.myConfig.serverMode === "local") {


      var pcmLocation = 'test/foopcm1.json';
      if ($scope.pcmLocation !== undefined) {
          pcmLocation = $scope.pcmLocation;
          $scope.isComingFromTest = true;
        }

      var canceler = $q.defer();


      $http.get(pcmLocation).success(function(data) {
          console.log('data from GET foopcm', data);
            var myPcm = data.pcm;
            var container = {};
            console.log('data: ' + data);
            console.log('myPCM: ' + myPcm);
            container.pcm = pcmApi.loadPCMModelFromString(JSON.stringify(myPcm));
            // container.pcm = pcmApi.loadPCMModelFromString(JSON.stringify(container.pcm));
            pcmApi.decodePCM(container.pcm);

            $timeout(function() {
              $scope.myPCMContainer.pcm = container.pcm;
              $scope.myPCMContainer.metadata = container.metadata;
             //$scope.csvApi.open();
             //$scope.htmlApi.open();
             //$scope.mediaWikiApi.open();
           }, 1000);
       });

     }


    ////// With OpenCompare Server (remote) //////
    if ($scope.myConfig.serverMode === "remote") {
        //
        // $scope.myConfig = {
        //    serverMode: "remote",
        //    serverAddress: "http://localhost:9000" // cross-origin issue "https://opencompare.org"
        //  };
        // openCompareServer.useRemoteServer("http://localhost:9000"); // cross-origin issue "https://opencompare.org"
        //
        //
        // var id = "581b53b38d6a4d31e94f5d38"
        // // var id = "5667063678c2faf9781b6f64";
        // if (typeof id !== 'undefined') {
        // //   /* Load a PCM from database */
        //    $scope.id = id;
        //    $scope.loading = true;
        //    //$scope.setEdit(false, false);
        //    //$scope.updateShareLinks();
        //    openCompareServer.get("/api/get/" + $scope.id).
        //    then(function (response) {
        //      var data = response.data;
        //      var pcm = pcmApi.loadPCMModelFromString(JSON.stringify(data.pcm));
        //      pcmApi.decodePCM(pcm); // Decode PCM from Base64
        //
        //      $scope.myPCMContainer.pcm = pcm;
        //      $scope.myPCMContainer.metadata = data.metadata;
        //      $scope.myPCMContainer.id = id;
        //      $scope.myState.saved = true;
        //
        //    }, function(error) {
        //      console.log(error);
        //    })
        //      .finally(function () {
        //        $scope.loading = false;
        //      })
        //  }
      }





  });

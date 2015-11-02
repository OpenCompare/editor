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
  .controller('TestCtrl', function($scope, pcmApi, $timeout) {
    var pcm = JSON.stringify(
      {"class":"org.opencompare.model.PCM@11450384561446481863000","name":"Q29tcGFyaXNvbl8oZ3JhbW1hcikgLSBDb21wYXJpc29uIGluIEVuZ2xpc2g=","generated_KMF_ID":"11450384561446481863000","productsKey":[],"products":[
        {"class":"org.opencompare.model.Product@16806773601446481863000","generated_KMF_ID":"16806773601446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@12028579551446481863000","content":"aWxs","rawContent":"aWxs","generated_KMF_ID":"12028579551446481863000","feature":["features[5478686961446481863000]"],"product":["products[16806773601446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@9063019641446481983753","value":"aWxs","generated_KMF_ID":"9063019641446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@5233352681446481863000","content":"d29yc2U=","rawContent":"d29yc2U=","generated_KMF_ID":"5233352681446481863000","feature":["features[10260163871446481863000]"],"product":["products[16806773601446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@10833268701446481983753","value":"d29yc2U=","generated_KMF_ID":"10833268701446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@13444768151446481863000","content":"d29yc3Q=","rawContent":"d29yc3Q=","generated_KMF_ID":"13444768151446481863000","feature":["features[14642317451446481863000]"],"product":["products[16806773601446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@20787682381446481983753","value":"d29yc3Q=","generated_KMF_ID":"20787682381446481983753"}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@14869679441446481863000","generated_KMF_ID":"14869679441446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@11040670911446481863000","content":"c21hbGxlciwgbGVzcyhlcik=","rawContent":"c21hbGxlciwgbGVzcyhlcik=","generated_KMF_ID":"11040670911446481863000","feature":["features[10260163871446481863000]"],"product":["products[14869679441446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.Multiple@5114580091446481983753","generated_KMF_ID":"5114580091446481983753","subvalues":[
              {"class":"org.opencompare.model.Conditional@18399173921446481983753","generated_KMF_ID":"18399173921446481983753","value":[
                {"class":"org.opencompare.model.StringValue@13880281611446481983753","value":"IGxlc3M=","generated_KMF_ID":"13880281611446481983753"}
              ],"condition":[
                {"class":"org.opencompare.model.StringValue@3103547401446481983753","value":"ZXI=","generated_KMF_ID":"3103547401446481983753"}
              ]}
              ,
              {"class":"org.opencompare.model.StringValue@78516241446481983753","value":"c21hbGxlcg==","generated_KMF_ID":"78516241446481983753"}
            ]}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@7159500491446481863000","content":"bGl0dGxl","rawContent":"bGl0dGxl","generated_KMF_ID":"7159500491446481863000","feature":["features[5478686961446481863000]"],"product":["products[14869679441446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@13935897631446481983753","value":"bGl0dGxl","generated_KMF_ID":"13935897631446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@13418232271446481863000","content":"c21hbGxlc3QsIGxlYXN0","rawContent":"c21hbGxlc3QsIGxlYXN0","generated_KMF_ID":"13418232271446481863000","feature":["features[14642317451446481863000]"],"product":["products[14869679441446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.Multiple@15464158171446481983753","generated_KMF_ID":"15464158171446481983753","subvalues":[
              {"class":"org.opencompare.model.StringValue@8580670671446481983753","value":"c21hbGxlc3Q=","generated_KMF_ID":"8580670671446481983753"}
              ,
              {"class":"org.opencompare.model.StringValue@1593546621446481983753","value":"IGxlYXN0","generated_KMF_ID":"1593546621446481983753"}
            ]}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@4979140081446481863000","generated_KMF_ID":"4979140081446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@20885525401446481863000","content":"bW9zdA==","rawContent":"bW9zdA==","generated_KMF_ID":"20885525401446481863000","feature":["features[14642317451446481863000]"],"product":["products[4979140081446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@14983517241446481983753","value":"bW9zdA==","generated_KMF_ID":"14983517241446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@17339947641446481863000","content":"bW9yZQ==","rawContent":"bW9yZQ==","generated_KMF_ID":"17339947641446481863000","feature":["features[10260163871446481863000]"],"product":["products[4979140081446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@17224457381446481983753","value":"bW9yZQ==","generated_KMF_ID":"17224457381446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@14082783391446481863000","content":"bWFueSwgbXVjaA==","rawContent":"bWFueSwgbXVjaA==","generated_KMF_ID":"14082783391446481863000","feature":["features[5478686961446481863000]"],"product":["products[4979140081446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.Multiple@21070514681446481983753","generated_KMF_ID":"21070514681446481983753","subvalues":[
              {"class":"org.opencompare.model.StringValue@1408153351446481983753","value":"bWFueQ==","generated_KMF_ID":"1408153351446481983753"}
              ,
              {"class":"org.opencompare.model.StringValue@7010915671446481983753","value":"IG11Y2g=","generated_KMF_ID":"7010915671446481983753"}
            ]}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@16291222321446481863000","generated_KMF_ID":"16291222321446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@11327942461446481863000","content":"ZnVydGhlcg==","rawContent":"ZnVydGhlcg==","generated_KMF_ID":"11327942461446481863000","feature":["features[10260163871446481863000]"],"product":["products[16291222321446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@4725932191446481983753","value":"ZnVydGhlcg==","generated_KMF_ID":"4725932191446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@15648663941446481863000","content":"ZmFy","rawContent":"ZmFy","generated_KMF_ID":"15648663941446481863000","feature":["features[5478686961446481863000]"],"product":["products[16291222321446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@15031143431446481983753","value":"ZmFy","generated_KMF_ID":"15031143431446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@17865463851446481863000","content":"ZnVydGhlc3Q=","rawContent":"ZnVydGhlc3Q=","generated_KMF_ID":"17865463851446481863000","feature":["features[14642317451446481863000]"],"product":["products[16291222321446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@19546130251446481983753","value":"ZnVydGhlc3Q=","generated_KMF_ID":"19546130251446481983753"}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@13657357111446481863000","generated_KMF_ID":"13657357111446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@11626654801446481863000","content":"YmFk","rawContent":"YmFk","generated_KMF_ID":"11626654801446481863000","feature":["features[5478686961446481863000]"],"product":["products[13657357111446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@3329274641446481983753","value":"YmFk","generated_KMF_ID":"3329274641446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@4031801311446481863000","content":"d29yc2U=","rawContent":"d29yc2U=","generated_KMF_ID":"4031801311446481863000","feature":["features[10260163871446481863000]"],"product":["products[13657357111446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@14541480911446481983753","value":"d29yc2U=","generated_KMF_ID":"14541480911446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@2500952831446481863000","content":"d29yc3Q=","rawContent":"d29yc3Q=","generated_KMF_ID":"2500952831446481863000","feature":["features[14642317451446481863000]"],"product":["products[13657357111446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@8553870771446481983753","value":"d29yc3Q=","generated_KMF_ID":"8553870771446481983753"}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@18277519271446481863000","generated_KMF_ID":"18277519271446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@19005922471446481863000","content":"YmV0dGVy","rawContent":"YmV0dGVy","generated_KMF_ID":"19005922471446481863000","feature":["features[10260163871446481863000]"],"product":["products[18277519271446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@13207169801446481983753","value":"YmV0dGVy","generated_KMF_ID":"13207169801446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@3576057441446481863000","content":"YmVzdA==","rawContent":"YmVzdA==","generated_KMF_ID":"3576057441446481863000","feature":["features[14642317451446481863000]"],"product":["products[18277519271446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@4905056901446481983753","value":"YmVzdA==","generated_KMF_ID":"4905056901446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@19173492171446481863000","content":"Z29vZA==","rawContent":"Z29vZA==","generated_KMF_ID":"19173492171446481863000","feature":["features[5478686961446481863000]"],"product":["products[18277519271446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@7956820071446481983753","value":"Z29vZA==","generated_KMF_ID":"7956820071446481983753"}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@19456703541446481863000","generated_KMF_ID":"19456703541446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@17237302001446481863000","content":"YmVzdA==","rawContent":"YmVzdA==","generated_KMF_ID":"17237302001446481863000","feature":["features[14642317451446481863000]"],"product":["products[19456703541446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@20906314201446481983753","value":"YmVzdA==","generated_KMF_ID":"20906314201446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@11226876571446481863000","content":"d2VsbA==","rawContent":"d2VsbA==","generated_KMF_ID":"11226876571446481863000","feature":["features[5478686961446481863000]"],"product":["products[19456703541446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@19961796971446481983753","value":"d2VsbA==","generated_KMF_ID":"19961796971446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@19874113351446481863000","content":"YmV0dGVy","rawContent":"YmV0dGVy","generated_KMF_ID":"19874113351446481863000","feature":["features[10260163871446481863000]"],"product":["products[19456703541446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@2610999371446481983753","value":"YmV0dGVy","generated_KMF_ID":"2610999371446481983753"}
          ]}
        ]}
        ,
        {"class":"org.opencompare.model.Product@15485808341446481863000","generated_KMF_ID":"15485808341446481863000","pcm":[""],"cells":[
          {"class":"org.opencompare.model.Cell@5117122151446481863000","content":"ZmFydGhlcg==","rawContent":"ZmFydGhlcg==","generated_KMF_ID":"5117122151446481863000","feature":["features[10260163871446481863000]"],"product":["products[15485808341446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@12350809841446481983753","value":"ZmFydGhlcg==","generated_KMF_ID":"12350809841446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@1776554791446481863000","content":"ZmFy","rawContent":"ZmFy","generated_KMF_ID":"1776554791446481863000","feature":["features[5478686961446481863000]"],"product":["products[15485808341446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@13693229351446481983753","value":"ZmFy","generated_KMF_ID":"13693229351446481983753"}
          ]}
          ,
          {"class":"org.opencompare.model.Cell@14575170301446481863000","content":"ZmFydGhlc3Q=","rawContent":"ZmFydGhlc3Q=","generated_KMF_ID":"14575170301446481863000","feature":["features[14642317451446481863000]"],"product":["products[15485808341446481863000]"],"interpretation":[
            {"class":"org.opencompare.model.StringValue@20980868371446481983753","value":"ZmFydGhlc3Q=","generated_KMF_ID":"20980868371446481983753"}
          ]}
        ]}
      ],"features":[
        {"class":"org.opencompare.model.Feature@10260163871446481863000","name":"Q29tcGFyYXRpdmU=","generated_KMF_ID":"10260163871446481863000","parentGroup":[],"cells":["products[18277519271446481863000]/cells[19005922471446481863000]","products[14869679441446481863000]/cells[11040670911446481863000]","products[15485808341446481863000]/cells[5117122151446481863000]","products[16291222321446481863000]/cells[11327942461446481863000]","products[4979140081446481863000]/cells[17339947641446481863000]","products[13657357111446481863000]/cells[4031801311446481863000]","products[16806773601446481863000]/cells[5233352681446481863000]","products[19456703541446481863000]/cells[19874113351446481863000]"]}
        ,
        {"class":"org.opencompare.model.Feature@14642317451446481863000","name":"U3VwZXJsYXRpdmU=","generated_KMF_ID":"14642317451446481863000","parentGroup":[],"cells":["products[4979140081446481863000]/cells[20885525401446481863000]","products[19456703541446481863000]/cells[17237302001446481863000]","products[18277519271446481863000]/cells[3576057441446481863000]","products[15485808341446481863000]/cells[14575170301446481863000]","products[16291222321446481863000]/cells[17865463851446481863000]","products[14869679441446481863000]/cells[13418232271446481863000]","products[16806773601446481863000]/cells[13444768151446481863000]","products[13657357111446481863000]/cells[2500952831446481863000]"]}
        ,
        {"class":"org.opencompare.model.Feature@5478686961446481863000","name":"UG9zaXRpdmU=","generated_KMF_ID":"5478686961446481863000","parentGroup":[],"cells":["products[4979140081446481863000]/cells[14082783391446481863000]","products[13657357111446481863000]/cells[11626654801446481863000]","products[15485808341446481863000]/cells[1776554791446481863000]","products[14869679441446481863000]/cells[7159500491446481863000]","products[16291222321446481863000]/cells[15648663941446481863000]","products[16806773601446481863000]/cells[12028579551446481863000]","products[19456703541446481863000]/cells[11226876571446481863000]","products[18277519271446481863000]/cells[19173492171446481863000]"]}
      ]}
    );

    var loadedPCM = pcmApi.loadPCMModelFromString(pcm);
    pcmApi.decodePCM(loadedPCM);

    $scope.myPCMContainer = {

    };

    $scope.myConfig = {
      serverMode: "client"
    };

    $scope.myState = {
      //edit: true,
      saved: true
    };

    $timeout(function() {
      $scope.myPCMContainer.pcm = loadedPCM;
      //$scope.csvApi.open();
      //$scope.htmlApi.open();
      //$scope.mediaWikiApi.open();
    }, 1000);





  });

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
    var pcm = JSON.stringify({"class":"pcm.PCM@2684530441437554316923","name":"Q29tcGFyaXNvbl8oZ3JhbW1hcikgLSBDb21wYXJpc29uIGluIEVuZ2xpc2g=","generated_KMF_ID":"2684530441437554316923","products":[
      {"class":"pcm.Product@13911264501437554316923","name":"bWFueSwgbXVjaA==","generated_KMF_ID":"13911264501437554316923","cells":[
        {"class":"pcm.Cell@15854244811437554316923","content":"bW9yZQ==","rawContent":"bW9yZQ==","generated_KMF_ID":"15854244811437554316923","feature":["features[2329332351437554316923]"],"product":["products[13911264501437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@11274448671437554396237","value":"bW9yZQ==","generated_KMF_ID":"11274448671437554396237"}
        ]},
        {"class":"pcm.Cell@5311042921437554316923","content":"bW9zdA==","rawContent":"bW9zdA==","generated_KMF_ID":"5311042921437554316923","feature":["features[423279221437554316923]"],"product":["products[13911264501437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@14346423991437554396237","value":"bW9zdA==","generated_KMF_ID":"14346423991437554396237"}
        ]}
      ]},
      {"class":"pcm.Product@13838490261437554316923","name":"bGl0dGxl","generated_KMF_ID":"13838490261437554316923","cells":[
        {"class":"pcm.Cell@9416598181437554316923","content":"c21hbGxlc3QsIGxlYXN0","rawContent":"c21hbGxlc3QsIGxlYXN0","generated_KMF_ID":"9416598181437554316923","feature":["features[423279221437554316923]"],"product":["products[13838490261437554316923]"],"interpretation":[
          {"class":"pcm.Multiple@2219719341437554396237","generated_KMF_ID":"2219719341437554396237","subvalues":[
            {"class":"pcm.StringValue@2868332261437554396237","value":"c21hbGxlc3Q=","generated_KMF_ID":"2868332261437554396237"},
            {"class":"pcm.StringValue@12330922271437554396237","value":"IGxlYXN0","generated_KMF_ID":"12330922271437554396237"}
          ]}
        ]},
        {"class":"pcm.Cell@4684061891437554316923","content":"c21hbGxlciwgbGVzcyhlcik=","rawContent":"c21hbGxlciwgbGVzcyhlcik=","generated_KMF_ID":"4684061891437554316923","feature":["features[2329332351437554316923]"],"product":["products[13838490261437554316923]"],"interpretation":[
          {"class":"pcm.Multiple@1846692921437554396237","generated_KMF_ID":"1846692921437554396237","subvalues":[
            {"class":"pcm.StringValue@15813276551437554396237","value":"c21hbGxlcg==","generated_KMF_ID":"15813276551437554396237"}
            ,
            {"class":"pcm.Conditional@10361208851437554396237","generated_KMF_ID":"10361208851437554396237","value":[
              {"class":"pcm.StringValue@1823944471437554396237","value":"IGxlc3M=","generated_KMF_ID":"1823944471437554396237"}
            ],"condition":[
              {"class":"pcm.StringValue@9546554731437554396237","value":"ZXI=","generated_KMF_ID":"9546554731437554396237"}
            ]}
          ]}
        ]}
      ]},
      {"class":"pcm.Product@15035405821437554316923","name":"aWxs","generated_KMF_ID":"15035405821437554316923","cells":[
        {"class":"pcm.Cell@5255574571437554316923","content":"d29yc2U=","rawContent":"d29yc2U=","generated_KMF_ID":"5255574571437554316923","feature":["features[2329332351437554316923]"],"product":["products[15035405821437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@17866797351437554396237","value":"d29yc2U=","generated_KMF_ID":"17866797351437554396237"}
        ]}
        ,
        {"class":"pcm.Cell@14081584601437554316923","content":"d29yc3Q=","rawContent":"d29yc3Q=","generated_KMF_ID":"14081584601437554316923","feature":["features[423279221437554316923]"],"product":["products[15035405821437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@4048711211437554396237","value":"d29yc3Q=","generated_KMF_ID":"4048711211437554396237"}
        ]}
      ]}
      ,
      {"class":"pcm.Product@21222185921437554316923","name":"d2VsbA==","generated_KMF_ID":"21222185921437554316923","cells":[
        {"class":"pcm.Cell@13006092951437554316923","content":"YmV0dGVy","rawContent":"YmV0dGVy","generated_KMF_ID":"13006092951437554316923","feature":["features[2329332351437554316923]"],"product":["products[21222185921437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@4005107981437554396237","value":"YmV0dGVy","generated_KMF_ID":"4005107981437554396237"}
        ]}
        ,
        {"class":"pcm.Cell@13789169181437554316923","content":"YmVzdA==","rawContent":"YmVzdA==","generated_KMF_ID":"13789169181437554316923","feature":["features[423279221437554316923]"],"product":["products[21222185921437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@6242505871437554396237","value":"YmVzdA==","generated_KMF_ID":"6242505871437554396237"}
        ]}
      ]}
      ,
      {"class":"pcm.Product@16083524341437554316923","name":"Z29vZA==","generated_KMF_ID":"16083524341437554316923","cells":[
        {"class":"pcm.Cell@12988150011437554316923","content":"YmV0dGVy","rawContent":"YmV0dGVy","generated_KMF_ID":"12988150011437554316923","feature":["features[2329332351437554316923]"],"product":["products[16083524341437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@9956559071437554396237","value":"YmV0dGVy","generated_KMF_ID":"9956559071437554396237"}
        ]}
        ,
        {"class":"pcm.Cell@13786375921437554316923","content":"YmVzdA==","rawContent":"YmVzdA==","generated_KMF_ID":"13786375921437554316923","feature":["features[423279221437554316923]"],"product":["products[16083524341437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@7686899261437554396237","value":"YmVzdA==","generated_KMF_ID":"7686899261437554396237"}
        ]}
      ]}
      ,
      {"class":"pcm.Product@3268613211437554316923","name":"ZmFy","generated_KMF_ID":"3268613211437554316923","cells":[
        {"class":"pcm.Cell@9965813811437554316923","content":"ZmFydGhlcg==","rawContent":"ZmFydGhlcg==","generated_KMF_ID":"9965813811437554316923","feature":["features[2329332351437554316923]"],"product":["products[3268613211437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@10838243331437554396237","value":"ZmFydGhlcg==","generated_KMF_ID":"10838243331437554396237"}
        ]}
        ,
        {"class":"pcm.Cell@10448251981437554316923","content":"ZmFydGhlc3Q=","rawContent":"ZmFydGhlc3Q=","generated_KMF_ID":"10448251981437554316923","feature":["features[423279221437554316923]"],"product":["products[3268613211437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@13393647551437554396237","value":"ZmFydGhlc3Q=","generated_KMF_ID":"13393647551437554396237"}
        ]}
      ]}
      ,
      {"class":"pcm.Product@16455116791437554316923","name":"YmFk","generated_KMF_ID":"16455116791437554316923","cells":[
        {"class":"pcm.Cell@18709500491437554316923","content":"d29yc2U=","rawContent":"d29yc2U=","generated_KMF_ID":"18709500491437554316923","feature":["features[2329332351437554316923]"],"product":["products[16455116791437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@8130260661437554396237","value":"d29yc2U=","generated_KMF_ID":"8130260661437554396237"}
        ]}
        ,
        {"class":"pcm.Cell@2544065591437554316923","content":"d29yc3Q=","rawContent":"d29yc3Q=","generated_KMF_ID":"2544065591437554316923","feature":["features[423279221437554316923]"],"product":["products[16455116791437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@3897639491437554396237","value":"d29yc3Q=","generated_KMF_ID":"3897639491437554396237"}
        ]}
      ]}
      ,
      {"class":"pcm.Product@4672922721437554316923","name":"ZmFy","generated_KMF_ID":"4672922721437554316923","cells":[
        {"class":"pcm.Cell@14259944401437554316923","content":"ZnVydGhlcg==","rawContent":"ZnVydGhlcg==","generated_KMF_ID":"14259944401437554316923","feature":["features[2329332351437554316923]"],"product":["products[4672922721437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@4264220071437554396237","value":"ZnVydGhlcg==","generated_KMF_ID":"4264220071437554396237"}
        ]}
        ,
        {"class":"pcm.Cell@15113970821437554316923","content":"ZnVydGhlc3Q=","rawContent":"ZnVydGhlc3Q=","generated_KMF_ID":"15113970821437554316923","feature":["features[423279221437554316923]"],"product":["products[4672922721437554316923]"],"interpretation":[
          {"class":"pcm.StringValue@21215502761437554396237","value":"ZnVydGhlc3Q=","generated_KMF_ID":"21215502761437554396237"}
        ]}
      ]}
    ],"features":[
      {"class":"pcm.Feature@423279221437554316923","name":"U3VwZXJsYXRpdmU=","generated_KMF_ID":"423279221437554316923","parentGroup":[],"cells":["products[13838490261437554316923]/cells[9416598181437554316923]","products[13911264501437554316923]/cells[5311042921437554316923]","products[3268613211437554316923]/cells[10448251981437554316923]","products[4672922721437554316923]/cells[15113970821437554316923]","products[16455116791437554316923]/cells[2544065591437554316923]","products[15035405821437554316923]/cells[14081584601437554316923]","products[16083524341437554316923]/cells[13786375921437554316923]","products[21222185921437554316923]/cells[13789169181437554316923]"]},
      {"class":"pcm.Feature@2329332351437554316923","name":"Q29tcGFyYXRpdmU=","generated_KMF_ID":"2329332351437554316923","parentGroup":[],"cells":["products[16455116791437554316923]/cells[18709500491437554316923]","products[4672922721437554316923]/cells[14259944401437554316923]","products[13911264501437554316923]/cells[15854244811437554316923]","products[21222185921437554316923]/cells[13006092951437554316923]","products[3268613211437554316923]/cells[9965813811437554316923]","products[15035405821437554316923]/cells[5255574571437554316923]","products[16083524341437554316923]/cells[12988150011437554316923]","products[13838490261437554316923]/cells[4684061891437554316923]"]}
    ]});

    var loadedPCM = pcmApi.loadPCMModelFromString(pcm);
    pcmApi.decodePCM(loadedPCM);

    $scope.myPCMContainer = {

    };

    $scope.myConfig = {
      serverMode: "client"
    };

    $scope.myState = {
      edit: true
    };
    //
    //$timeout(function() {
    //  $scope.myPCMContainer.pcm = loadedPCM;
    //}, 1000);


  });

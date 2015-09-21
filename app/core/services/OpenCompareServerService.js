/**
 * Created by gbecan on 9/17/15.
 */
angular
  .module('openCompareEditor')
  .service('openCompareServer', function($http, $q) {

    var client = "client";
    var local = "local";
    var remote = "remote";
    var mode = client;
    var remoteServerAddress = "";


    this.useClient = function() {
      mode = client;
    };

    this.useLocalServer = function() {
      mode = local;
    };

    this.useRemoteServer = function (newServerAddress) {
      mode = remote;
      remoteServerAddress = newServerAddress;
    };


    function processRequest(type, address, data, config) {
      return $q(function(resolve, reject) {
        if (mode !== client) {
          var requestAddress = address;
          if (mode === remote) {
            requestAddress = remoteServerAddress + '/' + address
          }

          if (type === "get") {
            resolve($http.get(requestAddress, data));
          } else {
            resolve($http.post(requestAddress, data));
          }
        } else {
          reject("Cannot request server in client mode.");
        }
      });
    }

    this.get = function (address, data, config) {
      return processRequest("get", address, data, config);
    };

    this.post = function (address, data, config) {
      return processRequest("post", address, data, config);
    };



  });

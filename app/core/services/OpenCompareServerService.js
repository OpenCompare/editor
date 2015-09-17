/**
 * Created by gbecan on 9/17/15.
 */
angular
  .module('openCompareEditor')
  .service('openCompareServer', function($http) {

    var client = "client";
    var local = "local";
    var remote = "remote";
    var mode = client;
    var remoteServerAddress = "";


    var clientResponse = {
      success : function() { return this; },
      error : function(callback) {
        callback("Cannot request server in client mode.");
        return this;
      }
    };

    this.useClient = function() {
      mode = client;
    };

    this.useLocalServer = function() {
      mode = local;
    };

    this.useRemoteServer = function (newServerAddress) {
      mode = remote;
      serverAddress = newServerAddress;
    };


    function processRequest(type, address, data, config) {
      if (mode !== client) {
        var requestAddress = address;
        if (mode === remote) {
          requestAddress = remoteServerAddress + '/' + address
        }

        if (type === "get") {
          return $http.get(requestAddress, data);
        } else {
          return $http.post(requestAddress, data);
        }
      } else {
        return clientResponse;
      }
    }

    this.get = function (address, data, config) {
      return processRequest("get", address, data, config);
    };

    this.post = function (address, data, config) {
      return processRequest("post", address, data, config);
    };



  });

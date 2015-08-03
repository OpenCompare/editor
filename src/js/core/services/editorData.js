/**
 * Created by hvallee on 8/3/15.
 */
pcmEditor.service("editorData", function() {

    this.data = {};
    this.rawdata = {};
    this.metadata = {};

    this.getData = function() {
        return data;
    };

    this.getRawdata = function() {
        return rawdata;
    };

    this.getMetadata = function() {
        return metadata;
    };



});

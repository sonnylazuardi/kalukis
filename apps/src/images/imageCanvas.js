/**
 * This module knows how to add an image to canvas
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(imageCanvas);

  function imageCanvas(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("addingImageInitted", this.addImage);
    };

    this.addImage = function(e, data){

    };

  }

});
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
      this.on("addingImageInitted", function(e, data){
        this.addImages(data.images);
      });
    };

    this.addImages = function(images){
      console.log(images);
    };

  }

});
/**
 * This module manages the steps needed to add image to the canvas.
 * Adding the image itself is not handled by this module, as that
 * task is delegated to other module.
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      withCanvasEvents = require("painters/withCanvasEvents");

  return defineComponent(imageCanvas, withCanvasEvents);

  function imageCanvas(){

    this.defaultAttrs({
      canvas: undefined
    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    this.attachEventListener = function(){
      this.on(document, "canvasConstructed", this.setCanvas);
      this.on(document, "imageWidgetClicked", this.prepareImageAddition);
      this.on(document, "outlineShapePaintingFinished", this.loadImage);
    };

    this.setCanvas = function(e, data){
      this.attr.canvas = data.canvas;
    };

    this.cancelPainting = function(){
      this.unregisterExistingListeners(this.attr.canvas);
    };

    this.prepareImageAddition = function(){
      this.prepareOutlineShapePainting(this.attr.canvas, {
        registerEventListeners: this.registerEventListeners,
        unregisterExistingListeners: this.unregisterExistingListeners
      });
    };

    this.selectImageFile = function(){

    };

    this.loadImage = function(){
      this.trigger(document, "addingImageInitted", {

      });
    };

  }

});
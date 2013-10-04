/**
 * I know whats needed in order for painting image to run properly. I
 * also process the painting events
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      compose = require("flight/lib/compose"),
      advice = require("flight/lib/advice"),
      RectOutline = require("outlineShapes/rectOutline");

  return withImagePainter;

  function withImagePainter(){

    /**
     * Load the images for the canvas
     * @param  {HTMLFileList} images The images
     */
    this.loadImages = function(images, outlineShape){
      var outline = outlineShape.getOutline(),
          cfg = {
            x: outline.x,
            y: outline.y,
            width: outline.width,
            height: outline.height
          };
      
      this.trigger("addingImagesInitted", {
        canvas: this.attr.canvas,
        images: images,
        cfg: cfg
      });
    };
  }

});
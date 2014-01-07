/**
 * I know whats needed in order for painting image to run properly. I
 * also process the painting events.
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
      
      this.addImages(this.attr.canvas, images, cfg);
    };

    /**
     * Add a particular image to canvas
     * @param {Object} canvas The canvas
     * @param {HTMLFile} image  The File representation of the image
     * @param {Object} cfg    The configuration
     */
    this.addImageToCanvas = function(canvas, image, cfg){
      var reader = new FileReader(),
          me = this;

      reader.onload = function(e){
        var img = new Image();

        img.onload = function(){
          var image = new fabric.Image(img);
          
          image.set({
            top: cfg.y + cfg.height / 2,
            left: cfg.x + cfg.width / 2,
            originX: 'center',
            originY: 'center',
            width: cfg.width,
            height: cfg.height
          });

          canvas.add(image).renderAll();

          me.trigger("notify", {
            type: "info",
            message: "Image loaded"
          });
        };

        img.src = e.target.result;    
      };

      this.trigger("notify", {
        type: "info",
        message: "Loading image"
      });

      reader.readAsDataURL(image);
    };

    /**
     * Add the images to canvas
     * @param {Object} canvas The canvas
     * @param {HTMLFileList} images The images file list
     * @param {Object} cfg    The configuration
     */
    this.addImages = function(canvas, images, cfg){
      this.attr.canvas = canvas;

      for (var i = 0; i < images.length; i++) {
        this.addImageToCanvas(canvas, images[i], cfg);
      }

      this.trigger("images-added");
    };
  }

});
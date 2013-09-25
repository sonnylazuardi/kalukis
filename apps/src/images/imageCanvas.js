/**
 * I know how to add an image to canvas
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(imageCanvas);

  function imageCanvas(){

    this.defaultAttrs({
      canvas: undefined,
    });

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("addingImageInitted", function(e, data){
        this.addImages(data.canvas, data.images, data.cfg);
      });

    };

    /**
     * Add a particular image to canvas
     * @param {Object} canvas The canvas
     * @param {HTMLFile} image  The File representation of the image
     * @param {Object} cfg    The configuration
     */
    this.addImageToCanvas = function(canvas, image, cfg){
      var reader = new FileReader();

      reader.onload = function(e){
        var img = new Image();

        img.onload = function(){
          var image = new fabric.Image(img);
          console.log(cfg);
          image.set({
            top: cfg.y + cfg.height / 2,
            left: cfg.x + cfg.width / 2,
            width: cfg.width,
            height: cfg.height
          });

          canvas.add(image).renderAll();

        };

        img.src = e.target.result;    
      };

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
    };
  }

});
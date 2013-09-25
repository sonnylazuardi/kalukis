/**
 * This module knows how to add an image to canvas
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
        this.addImages(data.canvas, data.images, data.position);
      });

    };

    this.addImages = function(canvas, images, cfg){
      this.attr.canvas = canvas;

      var reader = new FileReader();

      reader.onload = function(e){
        var img = new Image();

        img.onload = function(){
          var image = new fabric.Image(img);

          image.set({
            top: cfg.y,
            left: cfg.x,
            width: 300,
            height: 300
          });

          canvas.add(image).renderAll();

        };

        img.src = e.target.result;    
      };

      reader.readAsDataURL(images[0]);
    };
  }

});
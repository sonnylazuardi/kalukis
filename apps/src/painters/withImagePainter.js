/**
 * This module manages the steps needed to add image to the canvas.
 * Adding the image itself is not handled by this module, as that
 * task is delegated to other module.
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return withImagePainter;

  function withImagePainter(){

    this.defaultAttrs({

      mixinRectOutline: undefined

    });

    this.after("initialize", function(){
      this.attachEventListener();
      this.loadOutlineShape();
    });

    this.attachEventListener = function(){
      this.on("imageCanvasClicked", function(e, data){
        this.loadImages(data.files);
      }.bind(this));
    };

    this.loadOutlineShape = function(){
      require(["outlineShapes/rectOutline"], function(RectOutline){
        this.attr.mixinRectOutline = new RectOutline(this.attr.canvas, {});
      }.bind(this));
    };

    this.loadImages = function(images){
      this.trigger("outlineShapePaintingReady", {
        outlineShape: {
          id: "rect",
          outlineShape: this.attr.mixinRectOutline
        },
        customHandler: {
          outlineShapePaintingFinished: function(canvas, data){
            var position = {
              x: data.outlineShape.getOutline.x,
              y: data.outlineShape.getOutline.y
            };

            this.trigger("addingImageInitted", {
              canvas: canvas,
              images: images,
              position: position
            });
          }.bind(this)
        }
      });
    };
  }

});
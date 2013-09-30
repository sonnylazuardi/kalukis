/**
 * I know whats needed in order for painting image to run properly
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return withImagePainter;

  function withImagePainter(){

    this.defaultAttrs({

      mixinRectOutline: undefined

    });

    this.after("initialize", function(){
      this.loadOutlineShape();
    });

    this.stopImagePainting = function(){

    };

    this.startImagePainting = function(){

    };

    /**
     * Load the outlineShape
     */
    this.loadOutlineShape = function(){
      require(["outlineShapes/rectOutline"], function(RectOutline){
        this.attr.mixinRectOutline = new RectOutline(this.attr.canvas, {});
      }.bind(this));
    };

    /**
     * Load the images for the canvas
     * @param  {HTMLFileList} images The images
     */
    this.loadImages = function(images){
      this.trigger("outlineShapePaintingReady", {
        outlineShape: {
          id: "rect",
          outlineShape: this.attr.mixinRectOutline
        },
        customHandler: {
          outlineShapePaintingFinished: function(canvas, data){
            var outline = data.outlineShape.getOutline(),
                cfg = {
                  x: outline.x,
                  y: outline.y,
                  width: outline.width,
                  height: outline.height
                };
            
            this.trigger("addingImageInitted", {
              canvas: canvas,
              images: images,
              cfg: cfg
            });
          }.bind(this)
        }
      });
    };
  }

});
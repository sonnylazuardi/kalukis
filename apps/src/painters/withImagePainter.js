/**
 * I know whats needed in order for painting image to run properly. I
 * also process the painting events
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return withImagePainter;

  function withImagePainter(){

    this.defaultAttrs({
      /**
       * The outlineshape used by this mixin
       * @type {Object}
       */
      mixinRectOutline: undefined

    });

    this.after("initialize", function(){
      this.loadOutlineShape();
    });

    /**
     * Stop current painting
     * @return {[type]} [description]
     */
    this.stopImagePainting = function(){

    };

    /**
     * Start image painting
     * @param  {Object} canvas       Canvas instance
     * @param  {HTMLFileList} files        The images to paint
     * @param  {CanvasEvents} canvasEvents Canvas events which provides
     *                                     API to connect to canvas events
     */
    this.startImagePainting = function(canvas, files, canvasEvents){

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
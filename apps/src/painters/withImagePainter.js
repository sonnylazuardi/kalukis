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

    this.defaultAttrs({
      /**
       * The outlineshape used by this mixin
       * @type {Object}
       */
      mixinRectOutline: undefined

    });

    this.after("initialize", function(){
      this.attr.mixinRectOutline = new RectOutline(this.attr.canvas, {});
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
     * @param  {canvasEventsService} canvasEventsService Canvas events which provides
     *                                     API to connect to canvas events
     */
    this.startImagePainting = function(canvas, files, canvasEventsService){
      var outlineShape = this.attr.mixinRectOutline;

      if (outlineShape) {
        var listeners = {
          onMouseDown: function(e){
            outlineShape.onMouseDown(e);
          },
          onMouseMove: function(e){
            outlineShape.onMouseMove(e);
          },
          onMouseUp: function(e){
            outlineShape.onMouseUp(e);
          }
        };

        if (!outlineShape.hasOwnProperty("__hasBeenAddedAfterAdvice")) {
          compose.mixin(outlineShape, [advice.withAdvice]);

          outlineShape.after("finish", function(){
            this.loadImages(files, outlineShape);
          }.bind(this));

          outlineShape.__hasBeenAddedAfterAdvice = true;
        }

        canvasEventsService.unregisterExistingListeners(canvas);
        canvasEventsService.registerEventListeners(canvas, listeners);
        outlineShape.start();

      }
    };

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
      
      this.trigger("addingImageInitted", {
        canvas: this.attr.canvas,
        images: images,
        cfg: cfg
      });
    };
  }

});
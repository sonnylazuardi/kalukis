/**
 * I manage the steps taken to paint an image
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      withImagePainter = require("painters/withImagePainter"),
      withOutlinePainter = require("painters/withOutlinePainter"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      RectOutline = require("outlineShapes/rectOutline");

  return defineComponent(imagePainter, withImagePainter, withCanvasEvents, withOutlinePainter);

  function imagePainter(){

    this.defaultAttrs({

      /**
       * The canvas instance
       * @type {Object}
       */
      canvas: undefined,

      rectOutline: undefined,

      files: []
    });

    this.after("initialize", function(){
      this.attachEventListener();
      this.requestCanvas();
    });

    /**
     * Request canvas
     */
    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    /**
     * Set the canvas
     * @param {Object} canvas The canvas
     */
    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
      this.attr.rectOutline = new RectOutline(canvas, {});
    };

    /**
     * Add event handlers for interesting events
     */
    this.attachEventListener = function(){
      this.on("canvasServed", function(e, data){
        this.setCanvas(data.canvas);
      }.bind(this));

      this.on("imageCanvasClicked", function(e, data){
        // ask for other painting activity to stop
        this.trigger("cancelPaintingRequested", {
          active: "image"
        });

        this.initImagePainting(data.files);
      }.bind(this));

      this.on("cancelPaintingRequested", function(e, data){
        if (data.active !== "image") {
          this.stopCurrentPainting();
        }
      }.bind(this));

      this.on("addingImagesFinished", function(){
        this.stopCurrentPainting();
      }.bind(this));
    };

    /**
     * Cancel current image painting
     */
    this.stopCurrentPainting = function(){
      this.unregisterExistingListeners(this.attr.canvas);
      this.attr.files.length = 0;
    };

    /**
     * Begins image painting
     * @param  {HTMLFileList} files Images to paint
     */
    this.initImagePainting = function(files){
      var activeOutlineShape = this.attr.rectOutline;

      this.attr.files = files;

      if (activeOutlineShape) {

        this.on("outlineShapePaintingFinished", this.onOutlineShapePaintingFinished);

        this.startOutlineShapePainting(
          this.attr.canvas,
          activeOutlineShape,
          {
            registerEventListeners: this.registerEventListeners,
            unregisterExistingListeners: this.unregisterExistingListeners
          }
        );
      }
      
    };

    this.onOutlineShapePaintingFinished = function(e, data){
      this.off("outlineShapePaintingFinished", this.onOutlineShapePaintingFinished);
      this.loadImages(this.attr.files, this.attr.rectOutline);
    };

  }

});
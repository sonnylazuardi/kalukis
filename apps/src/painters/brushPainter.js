/**
 * I have the authority to manage the steps needed
 * to paint an object on top of the canvas. Therefore, I also needs
 * to have a reference to the active brush and outlineShape used
 * to draw.
 */
define(function(require){
  var fabric = require("fabric"),
      defineComponent = require("flight/lib/component"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      withBrushPainter = require("painters/withBrushPainter"),
      withOutlinePainter = require("painters/withOutlinePainter"),
      withActiveBrush = require("painters/withActiveBrush"),
      withActiveOutlineShape = require("painters/withActiveOutlineShape");

  return defineComponent(Lukis, withCanvasEvents, withBrushPainter, withOutlinePainter, withActiveBrush, withActiveOutlineShape);

  function Lukis() {

    this.defaultAttrs({

      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
    });

    this.after("initialize", function() {
      this.attachEventListeners();
      this.requestCanvas();
    });

    this.attachEventListeners = function() {
      this.on("brushes-loaded", function( e, data ) {
        this.requestBrush(data.brushes[0].id);
      });

      this.on("canvas-ready", function( e, data ) {
        this.setupCanvas(data.canvas);
      }.bind(this));

      this.on("cancel-painting", function( e, data ) {
        if (data.active !== "paint") {
          this.cancelCurrentPainting();
        }
      }.bind(this));

      // mapping paintWidget-clicked event to activeOutlineShape-changed
      this.on("paintWidget-clicked", function( e, data ) {
        this.requestOutlineShape(data.paintWidgetId);
      }.bind(this));
    };

    /**
     * Requesting for canvas instance
     */
    this.requestCanvas = function() {
      this.trigger("request-canvas");
    };

    /**
     * Savint the canvas instance
     * @param  {Object} canvas Canvas instance
     */
    this.setupCanvas = function( canvas ) {
      this.attr.canvas = canvas;
    };

    /**
     * Requesting for outlineShape instance
     * @param  {String} id OutlineShape ID
     */
    this.requestOutlineShape = function( id ) {
      // Once the outlineShape Instance is ready, we
      // start painting the outline
      this.on("activeOutlineShape-ready", this.onActiveOutlineShapeReady);

      this.trigger("activeOutlineShape-changed", {
        activeOutlineShapeId: id,
        id: id
      });
    };

    this.onActiveOutlineShapeReady = function( e, data ) {
      this.off("activeOutlineShape-ready", this.onActiveOutlineShapeReady);
        
      // make sure no other painting other than "paint"
      // is active
      this.trigger("cancel-painting", {
        active: "paint"
      });

      // start outline painting
      this.initOutlineShapePainting(data);
    };

    /**
     * Requesting for initiation of active brush
     * @param  {String} id Brush ID
     * @return {[type]}    [description]
     */
    this.requestBrush = function( id ) {
      this.requestBrushInstance(id);
    };

    /**
     * Cancel current paint painting
     */
    this.cancelCurrentPainting = function() {
      this.unregisterExistingListeners(this.attr.canvas);
      this.off("outlineShape-painting-finished", this.onOutlineShapePaintingFinished);
    };

    /**
     * Start painting outline.
     *
     * The `data` contains:
     *
     * + activeOutlineShape: the outline shape instance to use
     * 
     * @param  {Object} data Data need to paint
     */
    this.initOutlineShapePainting = function( data ) {
      if (data.activeOutlineShape) {
        this.trigger("notify", {
          type: "info",
          message: "Press [ESC] to cancel any painting"
        });
        // cancel any painting
        this.cancelCurrentPainting();

        // when outline painting is finished, we start painting the brush
        this.on("outlineShape-painting-finished", this.onOutlineShapePaintingFinished);

        // calls method from withOutlineShapePainter
        this.startOutlineShapePainting(
          this.attr.canvas,
          data.activeOutlineShape,
          {
            registerEventListeners: this.registerEventListeners,
            unregisterExistingListeners: this.unregisterExistingListeners
          }
        );  
      }
    };

    this.onOutlineShapePaintingFinished = function( e, data ) {
      this.initBrushPainting(data);
      // dont forget that we're still painting
      data.outlineShape.start();
    };

    /**
     * Start painting the brush.
     *
     * The `data` contains:
     * 
     * + outlineShapeId : the outline shape id
     * + outlineShape   : the outline shape instance
     * 
     * @param  {Object} data Data need to paint
     */
    this.initBrushPainting = function( data ) {
      var activeBrush = this.getActiveBrush();

      if (activeBrush && data.outlineShape) {
        this.startBrushPainting(
          this.attr.canvas,
          this.getActiveBrush(),
          data.outlineShape.getOutlinePoints(activeBrush.get('width'))
        );  
      }
    };

  }
});
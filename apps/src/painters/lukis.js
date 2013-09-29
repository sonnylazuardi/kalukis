/**
 * I have the authority to manage the steps needed
 * to paint an object on top of the canvas
 */
define(function(require){
  var fabric = require("fabric"),
      defineComponent = require("flight/lib/component"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      withBrushPainter = require("painters/withBrushPainter"),
      withOutlinePainter = require("painters/withOutlinePainter");

  return defineComponent(Lukis, withCanvasEvents, withBrushPainter, withOutlinePainter);

  function Lukis(){

    this.defaultAttrs({
    /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
      
      /**
       * Custom event handlers for events related to this module
       * @type {Array}
       */
      customHandlers: {}
    });

    this.after("initialize", function(){
      this.attachEventListeners();
      this.requestCanvas();
    });

    this.attachEventListeners = function(){
      this.on("canvasRequestResponded", function(e, data){
        this.setupCanvas(data.canvas);
      }.bind(this));

      this.on("cancelPaintingRequested", function(e, data){
        if (data.active !== "paint") {
          this.cancelCurrentPainting();
        }
      }.bind(this));

      this.on("paintWidgetClicked", function(e, data){
        this.publishActiveOutlineChange(data.paintWidgetId);
      }.bind(this));

      this.on("outlineShapePaintingFinished", function(e, data){
        // allowing a custom handler
        if (this.attr.customHandlers.outlineShapePaintingFinished) {
          var handler = this.attr.customHandlers.outlineShapePaintingFinished;

          // custom handler lives once only
          delete this.attr.customHandlers["outlineShapePaintingFinished"];

          handler.call(this, this.attr.canvas, data);
        } else {
          this.initBrushPainting(data);
        }
      }.bind(this));
    };

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    this.setupCanvas = function(canvas){
      this.attr.canvas = canvas;
    };

    this.publishActiveOutlineChange = function(id){
      this.on("activeOutlineShapeUpdated", function(e, data){
        this.off("activeOutlineShapeUpdated");
        
        this.trigger("cancelCurrentPainting", {
          active: "paint"
        });

        this.initOutlineShapePainting(data);
      }.bind(this));

      this.trigger("activeOutlineShapeChanged", {
        activeOutlineShapeId: id
      });
    };

    /**
     * Cancel current painting
     */
    this.cancelCurrentPainting = function(){
      this.unregisterExistingListeners(this.attr.canvas);
      this.attr.customHandlers = {};
    };

    /**
     * Start painting outline.
     *
     * The `data` contains:
     * + customHandler  : a custom handler for any event that might be published by the outline painter
     * 
     * @param  {Object} data Data need to paint
     */
    this.initOutlineShapePainting = function(data){
      this.cancelCurrentPainting();

      // if a customHandler is provided, than we need to call this handler
      // later
      if (data.customHandler){
        var key = Object.keys(data.customHandler)[0];
        this.attr.customHandlers[key] = data.customHandler[key];
      }

      // calls method from withOutlineShapePainter
      this.startOutlineShapePainting(this.attr.canvas, {
        registerEventListeners: this.registerEventListeners,
        unregisterExistingListeners: this.unregisterExistingListeners
      });
    };

    /**
     * Start painting the brush.
     *
     * The `data` contains:
     * + customHandler  : a custom handler for any event that might be published by the brush painter
     * + outlineShapeId : the outline shape id
     * + outlineShape   : the outline shape instance
     * 
     * @param  {Object} data Data need to paint
     */
    this.initBrushPainting = function(data){
      if (data.customHandler){
        var key = Object.keys(data.customHandler)[0];
        this.attr.customHandlers[key] = data.customHandler[key];
      }
      // calls method from withBrushPainter
      this.startBrushPainting(
        this.attr.canvas,
        data.outlineShape.getOutlinePoints(this.attr.activeBrush.get('width'))
      );
    };

  }
});
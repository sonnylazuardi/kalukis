/**
 * I know whats needed to draw a free hand
 */
define(function(require){

  var fabric = require("fabric"),
      brushDistance = require("extBrushes/fabric.BrushDistance"),
      brushSensitivity = require("extBrushes/fabric.BrushSensitivity");

  return withFreeHandPainter;

  function withFreeHandPainter() {

    this.defaultAttrs({
      /**
       * Canvas instance hold by this mixin
       * @type {Object}
       */
      mixinCanvas: undefined,

      /**
       * The brush to use for painting
       * @type {Object}
       */
      activeBrush: undefined,

    });

    this.after("initialize", function() {
      // a brush is served
      this.on("brush-served", function(e, data) {
        this.setBrush(data.brush);
      }.bind(this));

      // brush property has been updated by the brush manager
      this.on("brushProperty-updated", function(e, data) {
        // TODO I'm not sure if this is a good approach
        if (data.key === "width") {
          this.setBrushWidth(data.newValue);  
        } else if (data.key === "fillColor" || data.key === "strokeColor") {
          this.setBrushColor(data.newValue);
        } else if (data.key === "distance") {
          this.setBrushDistance(data.newValue);
        } else if (data.key === "sensitivity") {
          this.setSensitivity(data.newValue);
        }
      }.bind(this));
    });

    /**
     * Start free hand painting
     * @param  {Object} canvas Canvas
     * @param  {Object} brush  The custom brush to use. If not provided, then
     *                         we use the one saved by this mixin
     */
    this.startFreehandPainting = function( canvas, brush ) {
      // brush that will be used for this painting session
      var usedBrush = brush || this.attr.activeBrush;

      if (usedBrush) {
        this.attr.mixinCanvas = canvas;
        // state that we are in drawing mode
        this.attr.mixinCanvas.isDrawingMode = true;
        this.setupFreehandPaintingProperty(usedBrush);  
      }
    };

    /**
     * Setting up freehand brush properties for painting
     * @param  {Object} brush The brush
     */
    this.setupFreehandPaintingProperty = function( brush ) {
      var freeDrawingBrush = brush.getBrush();
      // setting the property for this painting session
      freeDrawingBrush.color = brush.get("fillColor");
      freeDrawingBrush.width = brush.get("width");
      // set this brush to the canvas' freeDrawingBrush property
      // this brush will be used by the canvas to draw freehand
      this.attr.mixinCanvas.freeDrawingBrush = freeDrawingBrush;
      // TODO if there's time, we should think of a better way
      // to change canvas' default painting behaviour
      // 
      // Do some hijaking. this is manipulating canvas' original
      // behaviour
      brushDistance.hijack(freeDrawingBrush);
      brushSensitivity.hijack(freeDrawingBrush);
    };

    /**
     * Stop painting
     */
    this.stopFreehandPainting = function() {
      if (this.attr.mixinCanvas) {
        this.attr.mixinCanvas.isDrawingMode = false;  
      }
    };

    /**
     * Setting brush instance to use for painting
     * @param {Object} brush The brush
     */
    this.setBrush = function( brush ) {
      this.attr.activeBrush = brush;

      // if we are currently in drawing mode, we need to update
      // the brush that is used by the canvas
      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.setupFreehandPaintingProperty(brush);
      }
    };

    /**
     * Update brush width
     * @param {Integer} width Width
     */
    this.setBrushWidth = function( width ) {
      this.attr.activeBrush.set("width", width);

      // if we are in drawing mode, we need to update the width property
      // of the currently active brush
      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush.width = width;
      }
    };

    /**
     * Setting brush color
     * @param {String} color Color
     */
    this.setBrushColor = function( color ) {
      this.attr.activeBrush.set("fillColor", color);

      // if we are in drawing mode, we need to update the color property
      // of the currently active brush
      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush.color = color;
      }
    };

    // TODO find a way to inject plugin that changes canvas' default
    // painting behaviour
    this.setBrushDistance = function( distance ) {
      brushDistance.setDistance(distance);
    };

    // TODO find a way to inject plugin that changes canvas' default
    // painting behaviour
    this.setSensitivity = function( sensitivity ) {
      brushSensitivity.setSensitivity(sensitivity);
    };

  }

});
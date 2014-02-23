/**
 * I have the authority to manage the steps needed
 * to paint an object on top of the canvas. Therefore, I also needs
 * to have a reference to the active brush and outlineShape used
 * to draw.
 *
 * The global steps needed to paint a brush:
 *
 * 1. the user chooses a brush and the shape he/she wants to draw
 * 2. the brushPainter prepares which outlineShape is going to be used
 * 3. when the user start painting (mouse down, and then mouse move), the
 * brushPainter initiates outline shape painting. This will draw an outline
 * of the shape that is later going to be rendered with the chosen brush.
 * 4. once the user has released the mouse, the brushPainter initiates drawing
 * the shape with the chosen brush. The brushPainter uses the outline points
 * that has been drawn on top of the canvas.
 */
define(function(require) {
  var fabric = require('fabric'),
      defineComponent = require('flight/lib/component'),
      withCanvasEvents = require('painters/mixin/withCanvasEvents'),
      withBrushPainter = require('painters/mixin/withBrushPainter'),
      withOutlinePainter = require('painters/mixin/withOutlinePainter'),
      withActiveBrush = require('painters/mixin/withActiveBrush'),
      withActiveOutlineShape = require('painters/mixin/withActiveOutlineShape');

  // withCanvasEvents: manage events that are published by canvas
  // withBrushPainter: the one responsible for painting a brush
  // withOutlinePainter: the one responsible for painting the outline shape
  // withActiveBrush: manages the currently active brush used by the user
  // withActiveOutlineShape: manages the currently active outline shape
  return defineComponent(brushPainter, withCanvasEvents, withBrushPainter, withOutlinePainter, withActiveBrush, withActiveOutlineShape);
  var self;
  function brushPainter() {

    this.defaultAttrs({

      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
      _socket: undefined,
      activeOutline: undefined
    });

    this.after('initialize', function() {
      this.attachEventListeners();
      self = this;
      self.attr._socket.on('outlineBrush', function(data) {
        // console.log(data);
        // {outlineShape: data, activeOutline: }
        self.initOutlineShapePainting(data.a);
        // var activeBrush = self.getActiveBrush();

        // if (activeBrush && data.b.outlineShape) {
          // `startBrushPainting`, a method from withBrushPainter
          self.startBrushPainting(
            self.attr.canvas,
            self.getActiveBrush(),
            data.c
          );  
        // }
        self.cancelCurrentPainting();
      });
    });

    this.attachEventListeners = function() {
      this.on('brushes-loaded', function(e, data) {
        this.requestBrush(data.brushes[0].id);
      });

      this.on('canvas-ready', function(e, data) {
        this.setupCanvas(data.canvas);
      }.bind(this));

      this.on('cancel-painting', function(e, data) {
        if (data.active !== 'paint') {
          this.cancelCurrentPainting();
        }
      }.bind(this));

      // mapping paintWidget-clicked event to activeOutlineShape-changed
      this.on('paintWidget-clicked', function(e, data) {
        this.requestOutlineShape(data.paintWidgetId);
      }.bind(this));
    };

    /**
     * Savint the canvas instance
     * @param  {Object} canvas Canvas instance
     */
    this.setupCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };

    /**
     * Requesting for outlineShape instance
     * @param  {String} id OutlineShape ID
     */
    this.requestOutlineShape = function(id) {
      // We setup an event handler here. So that, 
      // once the outlineShape Instance is ready, we
      // start painting the outline
      this.on('activeOutlineShape-ready', this.onActiveOutlineShapeReady);
      // now, requesting the active outlineshape instance
      this.trigger('activeOutlineShape-changed', {
        activeOutlineShapeId: id,
        id: id
      });
    };

    this.onActiveOutlineShapeReady = function(e, data) {
      // no need to listen to this event anymore
      this.off('activeOutlineShape-ready', this.onActiveOutlineShapeReady);
        
      // make sure no other painting other than 'paint'
      // is active
      console.log('cancel');
      this.trigger('cancel-painting', {
        active: 'paint'
      });

      // start outline painting
      this.initOutlineShapePainting(data);
    };

    /**
     * Requesting for initiation of active brush
     * @param  {String} id Brush ID
     * @return {[type]}    [description]
     */
    this.requestBrush = function(id) {
      this.requestBrushInstance(id);
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
    this.initOutlineShapePainting = function(data) {
      console.log("outline shape painting");
      console.log(data);
      self.activeOutline = data;
      if (data.activeOutlineShape) {
        this.trigger('notify', {
          type: 'info',
          message: 'Press [ESC] to cancel any painting'
        });
        // cancel any painting
        this.cancelCurrentPainting();

        // we need to attach this event handler here, so that
        // when outline painting is finished, we start painting the brush
        this.on('outlineShape-painting-finished', this.onOutlineShapePaintingFinished);

        // now start painting the outline shape
        // `startOutlineShapePainting`, a method from withOutlinePainting
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

    /**
     * Painting the outline shape has been finished
     * @param  {Object} e    Event Object
     * @param  {Object} data Event Data
     */
    this.onOutlineShapePaintingFinished = function(e, data) {
      // preparing painting with the chosen brush.
      // `data`, normally, it'd contain the drawn outlineShape
      // instance.
      this.initBrushPainting(data);
      // don't forget, after drawing the shape, we are still
      // in drawing mode. So, we start the painting steps
      // from the beggining again.
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
    this.initBrushPainting = function(data) {
      console.log("brush painting");
      console.log(data);
      
      // `getActiveBrush`, a method from withActiveBrush
      var activeBrush = this.getActiveBrush();

      if (activeBrush && data.outlineShape) {
        // `startBrushPainting`, a method from withBrushPainter
        this.startBrushPainting(
          this.attr.canvas,
          this.getActiveBrush(),
          data.outlineShape.getOutlinePoints(activeBrush.get('width'))
        );  
        this.attr._socket.emit('outlineBrush', {a: data, b: self.activeOutline, c:data.outlineShape.getOutlinePoints(activeBrush.get('width'))});
      }
    };

    /**
     * Cancel current paint painting
     */
    this.cancelCurrentPainting = function() {
      this.unregisterExistingListeners(this.attr.canvas);
      this.off('outlineShape-painting-finished', this.onOutlineShapePaintingFinished);
    };

  }
});
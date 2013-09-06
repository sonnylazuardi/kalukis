/**
 * This component has an authority in managing brushes that have
 * been initted. It also has responsibility in interacting with
 * events related to brushes properties.
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(brushManager);

  function brushManager(){

    this.defaultAttrs({
      canvas: undefined,

      canvasEl: "",
      /**
       * Brushes that have been initted
       * @type {Object}
       */
      brushes: {},

      /**
       * The current active brush
       * @type {Object}
       */
      activeBrush: undefined,

      /**
       * Global brush properties
       * @type {Object}
       */
      prop: {
        /**
         * The fill color of a brush
         * @type {String}
         */
        fillColor: "#000000",

        /**
         * The stroke color of a brush
         * @type {String}
         */
        strokeColor: "#000000",

        /**
         * The width of a brush
         * @type {Number}
         */
        width: 10
      }
    });

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    /**
     * The events to listen to
     * @return {[type]} [description]
     */
    this.attachEventListeners = function(){
      this.on("canvasConstructed", this.setCanvas);

      this.on("brushPropertyChanged", this.updateBrushProperty);
      this.on("brushCreated", this.updateCreatedBrushList);

      this.on("activeBrushChanged", this.setActiveBrush);
    };

    /**
     * Set the canvas instance and its element
     * @param {String} e    Event
     * @param {Object} data EVent Data
     */
    this.setCanvas = function(e, data){
      this.attr.canvas = data.canvas;
      this.attr.canvasEl = data.canvasEl;
    };

    /**
     * Update brush properties.
     * 
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.updateBrushProperty = function(e, data){
      Object.keys(data || {}).forEach(function(key){
        var oldValue = this.attr.prop[key] || undefined;

        this.attr.prop[key] = data[key];

        this.trigger("brushPropertyUpdated", {
          key: key,
          oldValue: oldValue,
          newValue: data[key]
        });
      }, this);
    };

    /**
     * Update initted brushes
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.updateCreatedBrushList = function(e, data){
      if (data.brush && data.brushId) {
        this.attr.brushes[data.brushId] = data.brush;
      }
    };

    /**
     * Set the properties of an active brush
     */
    this.setBrushProperties = function(brush){
      Object.keys(this.attr.prop || {}).forEach(function(key){
        brush.set(key, this.attr.prop[key]);
      }, this);
    };

    /**
     * Set the current active brush. We will construct
     * the brush if it has not been constructed before.
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.setActiveBrush = function(e, data){
      if (data.activeBrushId && this.attr.canvas){

        var oldActiveBrush = this.attr.activeBrush,
            brush, BrushProto;
        
        if (this.attr.brushes.hasOwnProperty(data.activeBrushId)) {
          brush = this.attr.brushes[data.activeBrushId];
          // update the brush properties
          this.setBrushProperties(brush);
        } else {
          // TODO what if the brush requested cannot be found?
          BrushProto = require("brushes/" + data.activeBrushId);
          brush = new BrushProto(this.attr.canvas, this.attr.prop);
          // remember this brush
          this.attr.brushes[data.activeBrushId] = brush;
        }

        this.attr.activeBrush = {
          id: data.activeBrushId,
          brush: brush
        };

        this.trigger("activeBrushUpdated", {
          oldActiveBrush: oldActiveBrush,
          newActiveBrush: this.attr.activeBrush
        });
      }
    };

  }

});
/**
 * I know how to manage the lifecycle of a brush. I also provide these
 * brushes when someone request them.
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(brushManager);

  function brushManager(){

    this.defaultAttrs({
      /**
       * The canvas element ID
       * @type {String}
       */
      canvasId: undefined,

      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,

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
      this.requestCanvas();
    });

    /**
     * The events to listen to
     * @return {[type]} [description]
     */
    this.attachEventListeners = function(){
      this.on("canvasRequestResponded", function(e, data){
        this.setCanvas(data.id, data.canvas);
      }.bind(this));

      this.on("brushPropertyChanged", function(e, data){
        var key = Object.keys(data)[0],
            value = data[key];
        this.updateBrushProperty(key, value);
      }.bind(this));

      this.on("brushesLoaded", function(e, data){
        if (data.brushes) {
          var defaultBrush = data.brushes[0];

          this.setActiveBrush(defaultBrush.id);
        }
      }.bind(this));

      this.on("brushPropertiesRequested", function(){
        this.publishBrushProperties();
      });

      this.on("activeBrushChanged", function(e, data){
        this.setActiveBrush(data.activeBrushId);
      }.bind(this));
    };

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    /**
     * Setup canvas attributes
     * @param {String} id     Canvas element id
     * @param {Object} canvas Canvas Object
     */
    this.setCanvas = function(id, canvas){
      this.attr.canvas = canvas;
      this.attr.canvasId = id;
    };

    /**
     * Publish the recorded brush properties
     */
    this.publishBrushProperties = function(){
      this.trigger("brushPropertiesRequestResponded", {
        properties: this.attr.prop
      });
    };

    /**
     * Update brush properties.
     * 
     * @param  {Object} data Event Data
     */
    this.updateBrushProperty = function(key, value){
      if (!key) {
        return;
      }

      var oldValue = this.attr.prop[key];

      this.attr.prop[key] = value;

      this.trigger("brushPropertyUpdated", {
        key: key,
        oldValue: oldValue,
        newValue: this.attr.prop[key]
      });
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
     * 
     * @param {String} id    Brush Id
     */
    this.setActiveBrush = function(id){
      var oldActiveBrush = this.attr.activeBrush,
          brush, BrushProto;
      
      if (this.attr.brushes.hasOwnProperty(id)) {
        brush = this.attr.brushes[id];
        // update the brush properties
        this.setBrushProperties(brush);
        this.attr.activeBrush = {
          id: id,
          brush: brush
        };

        this.processSetActiveBrush(oldActiveBrush, this.attr.activeBrush);
      } else {
        // TODO what if the brush requested cannot be found?
        require(["brushes/" + id], function(BrushProto){
          brush = new BrushProto(this.attr.canvas, this.attr.prop);
          // remember this brush
          this.attr.brushes[id] = brush;
          this.attr.activeBrush = {
            id: id,
            brush: brush
          };

          this.processSetActiveBrush(oldActiveBrush, this.attr.activeBrush);
        }.bind(this));
      }
    };

    this.processSetActiveBrush = function(oldActiveBrush, newActiveBrush){
      this.trigger("activeBrushUpdated", {
        oldActiveBrush: oldActiveBrush,
        newActiveBrush: newActiveBrush
      });
    };
  }

});
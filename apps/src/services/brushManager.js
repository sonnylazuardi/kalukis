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
      this.on("canvas-served", function(e, data){
        this.setCanvas(data.id, data.canvas);
      }.bind(this));

      this.on("brushProperty-changed", function(e, data){
        var key = Object.keys(data)[0],
            value = data[key];
        this.updateBrushProperty(key, value);
      }.bind(this));

      this.on("request-brushProperties", function(){
        this.publishBrushProperties();
      });

      this.on("request-brush", function(e, data){
        this.requestBrush(data.id);
      });
      
    };

    this.requestCanvas = function(){
      this.trigger("request-canvas");
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
      this.trigger("brushProperties-served", {
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

      this.trigger("brushProperty-updated", {
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
     * Publish the requested brush
     * @param  {String} id Brush ID
     */
    this.requestBrush = function(id) {
      if (this.attr.brushes.hasOwnProperty(id)) {
        var brush = this.attr.brushes[id];
        // update the brush properties
        this.setBrushProperties(brush);

        this.publishRequestedBrush(brush);
      } else {
        // TODO what if the brush requested cannot be found?
        require(["brushes/" + id], function(BrushProto){
          var brush = new BrushProto(this.attr.canvas, this.attr.prop);
          // remember this brush
          this.attr.brushes[id] = brush;
          
          this.publishRequestedBrush(brush);
        }.bind(this));
      }
    };

    /**
     * Publish the requested brush
     * @param  {Object} brush The brush to publish
     */
    this.publishRequestedBrush = function(brush){
      this.trigger("brush-served", {
        brush: brush
      });
    };
  }

});
/**
 * This components has authority in managing outline shapes painter
 * that has been initted. It also has responsibility in interacting
 * with events related to outline properties and activities.
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(outlineManager);

  function outlineManager(){
    
    this.defaultAttrs({
      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,

      /**
       * Canvas element
       * @type {String}
       */
      canvasEl: "",

      /**
       * The outline shapes that have been constructed
       * @type {Object}
       */
      outlineShapes: {},

      /**
       * The current active outline shape
       * @type {Object}
       */
      activeOutlineShape: undefined,

      /**
       * The properties of the outline shape
       * @type {Object}
       */
      prop: {
        width: 10,

        fillColor: "#000000",

        strokeColor: "#000000"
      }
    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    /**
     * Add events to listen to
     * @return {[type]} [description]
     */
    this.attachEventListener = function(){
      this.on("canvasConstructed", this.setCanvas);

      this.on("paintWidgetClicked", this.setActiveOutlineShape);
      this.on("brushPropertyUpdated", this.updateOutlineProperties);
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
     * Set the active outline shape
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.setActiveOutlineShape = function(e, data){
      if (data.paintWidgetId && this.attr.canvas) {
        // TODO publish activeOutlineShape through event
      }
    };

    /**
     * Set outline properties
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.updateOutlineProperties = function(e, data){
      if (data.hasOwnProperty("key") && data.hasOwnProperty("newValue")) {
        this.attr.prop[data.key] = data.newValue;
      }
    };

    /**
     * Set the outlineShape properties with the properties
     * hold by this component
     * @param {Object} outlineShape The outline shape
     */
    this.setOutlineShapeProperties = function(outlineShape){
      Object.keys(this.attr.prop || {}).forEach(function(key){
        outlineShape.set(key, this.attr.prop[key]);
      }, this);
    };

  }

});
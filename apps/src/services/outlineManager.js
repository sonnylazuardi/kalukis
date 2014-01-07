/**
 * I know how to manage the outlineShape lifecycle. I also provide these 
 * outlineShapes when someone requested them.
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(outlineManager);

  function outlineManager(){
    
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
       * The outline shapes that have been constructed
       * @type {Object}
       */
      outlineShapes: {},

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
      this.requestCanvas();
    });

    /**
     * Add events to listen to
     * @return {[type]} [description]
     */
    this.attachEventListener = function(){

      this.on("canvas-ready", function(e, data){
        this.setCanvas(data.id, data.canvas);
      }.bind(this));

      this.on("request-outlineShape", function(e, data){
        this.requestOutlineShape(data.id);
      }.bind(this));

      this.on("brushProperty-updated", function(e, data) {
        this.updateOutlineProperties(data);
      }.bind(this));
    };

    /**
     * Request for canvas
     */
    this.requestCanvas = function(){
      this.trigger("request-canvas");
    };

    /**
     * Set the canvas instance and its element
     * @param {String} e    Event
     * @param {Object} data EVent Data
     */
    this.setCanvas = function(id, canvas){
      this.attr.canvasId = id;
      this.attr.canvas = canvas;
    };

    /**
     * Setup outline shape
     * @param  {String} id OutlineShape id
     */
    this.requestOutlineShape = function(id) {
      id += "Outline";

      if (this.attr.outlineShapes.hasOwnProperty(id)) {
        var outlineShape = this.attr.outlineShapes[id];
        this.setOutlineShapeProperties(outlineShape);
        this.publishOutlineShape(outlineShape);
      } else {
        require(["outlineShapes/" + id], function(OutlineShapeProto){
          var outlineShape = new OutlineShapeProto(this.attr.canvas, this.attr.prop);
          // remember me
          this.attr.outlineShapes[id] = outlineShape;

          this.publishOutlineShape(outlineShape);
        }.bind(this));
      }
    };

    /**
     * Publish the outlineShape
     * @param  {Obect} outlineShape OutlineShape instance
     */
    this.publishOutlineShape = function(outlineShape){
      this.trigger("outlineShape-served", {
        outlineShape: outlineShape
      });
    };

    /**
     * Set outline properties
     * @param {Object} data Outline Properties
     */
    this.updateOutlineProperties = function(data){
      if (data.hasOwnProperty("key") && data.hasOwnProperty("newValue")) {
        var oldValue = this.attr.prop[data.key];
        this.attr.prop[data.key] = data.newValue;

        this.trigger("outlineShapeProperty-updated", {
          key: data.key,
          oldValue: oldValue,
          newValue: data.newValue
        });
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
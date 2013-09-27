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
      this.requestCanvas();
    });

    /**
     * Add events to listen to
     * @return {[type]} [description]
     */
    this.attachEventListener = function(){
      this.on("canvasRequestResponded", function(e, data){
        this.setCanvas(data.id, data.canvas);
      }.bind(this));

      this.on("paintWidgetClicked", function(e, data){
        this.setActiveOutlineShape(data.paintWidgetId);
      }.bind(this));

      this.on("brushPropertyUpdated", this.updateOutlineProperties);
    };

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
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
     * Set the active outline shape
     * 
     * @param {String} id    OutlineShape ID
     */
    this.setActiveOutlineShape = function(id){
      var oldActiveOutlineShape = this.attr.activeOutlineShape,
          outlineShape, OutlineShapeProto;
      
      id += "Outline";

      if (this.attr.outlineShapes.hasOwnProperty(id)) {
        outlineShape = this.attr.outlineShapes[id];
        this.setOutlineShapeProperties(outlineShape);

        this.publishUpdatedOutlineShape(oldActiveOutlineShape, {
          id: id,
          outlineShape: outlineShape
        });
      } else {
        require(["outlineShapes/" + id], function(OutlineShapeProto){
          outlineShape = new OutlineShapeProto(this.attr.canvas, this.attr.prop);
          // remember me
          this.attr.outlineShapes[id] = outlineShape;

          this.publishUpdatedOutlineShape(oldActiveOutlineShape, {
            id: id,
            outlineShape: outlineShape
          });
        }.bind(this));
      }
    };

    this.publishUpdatedOutlineShape = function(oldOutlineShape, newOutlineShape){
      this.attr.activeOutlineShape = newOutlineShape;
      
      this.trigger(document, "activeOutlineShapeUpdated", {
        oldActiveOutlineShape: oldOutlineShape,
        newActiveOutlineShape: newOutlineShape
      });
    };

    /**
     * Set outline properties
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.updateOutlineProperties = function(e, data){
      if (data.hasOwnProperty("key") && data.hasOwnProperty("newValue")) {
        var oldValue = this.attr.prop[data.key];
        this.attr.prop[data.key] = data.newValue;

        this.trigger("outlineShapePropertyUpdated", {
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
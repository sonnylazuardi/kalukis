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
      this.on("brushPropertyUpdated", this.setOutlineProperties);
    };

    /**
     * Set outline properties
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.setOutlineProperties = function(e, data){

    };

  }

});
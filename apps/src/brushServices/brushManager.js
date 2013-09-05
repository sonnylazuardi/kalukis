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
      this.on("brushPropertyChanged", this.updateBrushProperty);
      this.on("brushCreated", this.updateCreatedBrushList);
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

  }

});
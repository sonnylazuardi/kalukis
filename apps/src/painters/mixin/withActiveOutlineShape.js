/**
 * I know what the current active outlineShape is
 */
define(function(require){

  return withActiveOutlineShape;

  function withActiveOutlineShape(){
    var activeOutlineShape;

    this.after("initialize", function(){

      this.on("activeOutlineShape-changed", function(e, data){
        this.requestOutlineShapeInstance(data.id);
      }.bind(this));

      this.on("brushProperty-updated", function(e, data){
        this.updateActiveOutlineShapeProperty(data.key, data.newValue);
      }.bind(this));

    });

    /**
     * Request outlineShape instance
     * @param  {String} id OutlineShape ID
     */
    this.requestOutlineShapeInstance = function(id){
      // we need to attach this event handler here, so that
      // once the ourline shape has been served, we can process
      // it correctly
      this.on("outlineShape-served", this.onOutlineShapeServed);
      // requesting for this outline shape
      this.trigger("request-outlineShape", {
        id: id
      });
    };

    this.onOutlineShapeServed = function(e, data) {
      this.off("outlineShape-served", this.onOutlineShapeServed);
      this.setActiveOutlineShapeInstance(data.outlineShape);
    };

    /**
     * Set the outlineShape instance
     * @param {Object} outlineShape OutlineShape Instance
     */
    this.setActiveOutlineShapeInstance = function(outlineShape) {
      activeOutlineShape = outlineShape;
      this.trigger("activeOutlineShape-ready", {
        activeOutlineShape: outlineShape
      });
    };

    /**
     * Get the current active outlineShape
     * @return {Object} Active outlineShape
     */
    this.getActiveOutlineShape = function(){
      return activeOutlineShape;
    };

    /**
     * Update the property of the current active outlineShape
     * @param  {String} key   Property name
     * @param  {String} value Property value
     */
    this.updateActiveOutlineShapeProperty = function(key, value) {
      if (activeOutlineShape) {
        activeOutlineShape.set(key, value);
      }
    };
  }

});
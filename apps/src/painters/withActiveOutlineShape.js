/**
 * I know what the current active outlineShape is
 */
define(function(require){

  return withActiveOutlineShape;

  function withActiveOutlineShape(){
    var activeOutlineShape;

    this.after("initialize", function(){

      this.on("activeOutlineShapeChanged", function(e, data){
        this.requestOutlineShapeInstance(data.id);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateActiveOutlineShapeProperty(data.key, data.newValue);
      }.bind(this));

    });

    /**
     * Request outlineShape instance
     * @param  {String} id OutlineShape ID
     */
    this.requestOutlineShapeInstance = function(id){
      this.on("outlineShapeServed", this.onOutlineShapeServed);

      this.trigger("outlineShapeRequested", {
        id: id
      });
    };

    this.onOutlineShapeServed = function(e, data) {
      this.off("outlineShapeServed", this.onOutlineShapeServed);
      this.setActiveOutlineShapeInstance(data.outlineShape);
    };

    /**
     * Set the outlineShape instance
     * @param {Object} outlineShape OutlineShape Instance
     */
    this.setActiveOutlineShapeInstance = function(outlineShape) {
      activeOutlineShape = outlineShape;
      this.trigger("activeOutlineShapeReady", {
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
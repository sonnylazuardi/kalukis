/**
 * I know what the current active brush is
 */
define(function(require){

  return withActiveBrush;

  function withActiveBrush(){

    var activeBrush;

    this.after("initialize", function(){
      this.on("activeBrushChanged", function(e, data){
        this.requestBrushInstance(data.activeBrushId);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateBrushProperty(data.key, data.newValue);
      }.bind(this));
    });

    /**
     * Request an brush instance
     * @param  {String} id The brush id
     */
    this.requestBrushInstance = function(id){
      this.on("brushServed", this.onBrushServed);
      
      this.trigger("brushRequested", {
        id: id
      });
    };

    this.onBrushServed = function(e, data) {
      this.off("brushServed", this.onBrushServed);
      this.setActiveBrushInstance(data.brush);
    };

    /**
     * Set the active brush instance
     * @param {Object} brush Brush instance
     */
    this.setActiveBrushInstance = function(brush) {
      activeBrush = brush;
      this.trigger("activeBrushReady", {
        activeBrush: brush
      });
    };

    /**
     * Get the current active brush
     * @return {Object} The active brush instance
     */
    this.getActiveBrush = function() {
      return activeBrush;
    };

    /**
     * Update the property of an active brush instance
     * @param  {String} key   The property name
     * @param  {String} value The new value
     */
    this.updateBrushProperty = function(key, value) {
      if (activeBrush) {
        activeBrush.set(key, value);
      }
    };

  }

});
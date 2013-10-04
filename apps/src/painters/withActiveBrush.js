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
      this.on("brushServed", function(e, data){
        this.off("brushRequested");
        this.setBrushInstance(data.brush);
      }.bind(this));

      this.trigger("brushRequested", {
        id: id
      });
    };

    /**
     * Set the active brush instance
     * @param {Object} brush Brush instance
     */
    this.setBrushInstance = function(brush) {
      activeBrush = brush;
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
/**
 * I know what the current active outlineShape is
 */
define(function(require){

  return withActiveOutlineShape;

  function withActiveOutlineShape(){
    var activeOutlineShape;

    this.after("initialize", function(){

      this.on("paintWidgetClicked", function(e, data){
        this.requestOutlineShapeInstance(data.paintWidgetId);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateActiveOutlineShapeProperty(data.key, data.newValue);
      }.bind(this));

    });

    this.requestOutlineShapeInstance = function(id){
      this.on("outlineShapeServed", function(e, data) {
        this.off("outlineShapeServed");
        this.setActiveOutlineShapeInstance(data.outlineShape);
      }.bind(this));

      this.trigger("outlineShapeRequested", {
        id: id
      });
    };

    this.setActiveOutlineShapeInstance = function(outlineShape) {
      activeOutlineShape = outlineShape;
    };

    this.getActiveOutlineShape = function(){
      return activeOutlineShape;
    };

    this.updateActiveOutlineShapeProperty = function(key, value) {
      if (activeOutlineShape) {
        activeOutlineShape.set(key, value);
      }
    };
  }

});
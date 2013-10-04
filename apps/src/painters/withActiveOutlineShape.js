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

      }.bind(this));

    });

    this.requestOutlineShapeInstance = function(id){
      this.on("outlineShapeRequestResponded", function(e, data) {
        this.off("outlineShapeRequestResponded");
        this.setOutlineShapeInstance(data.outlineShape);
      }.bind(this));

      this.trigger("outlineShapeRequested", {
        id: id
      });
    };

    this.setOutlineShapeInstance = function(outlineShape) {
      activeOutlineShape = outlineShape;
    };

    this.getActiveOutlineShape = function(){
      return activeOutlineShape;
    };
  }

});
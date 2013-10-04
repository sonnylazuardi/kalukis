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

    this.setActiveOutlineShapeInstance = function(outlineShape) {
      activeOutlineShape = outlineShape;
      this.trigger("activeOutlineShapeReady", {
        activeOutlineShape: outlineShape
      });
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
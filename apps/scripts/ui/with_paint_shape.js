/**
 * A mixin for painting a certain shape.
 * @return {[type]} [description]
 */
define(function(){

  function withPaintShape(){
    this.defaultAttrs({
      type: "",
      isPainting: false,
      brush: {
        color: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on(document, "uiBrushClicked", this.onUiBrushClicked);
    });

    this.onUiBrushClicked = function(e, eObj){
      if (eObj.clicked !== this.attr.type){
        this.trigger(document, "paintStopRequested");
      }
    };

    this.setBrushProperty = function(e, eObj){

    };
  }

});
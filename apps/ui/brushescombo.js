define(["flight/component"],
function(defineComponent){

  return defineComponent(BrushesCombo);

  function BrushesCombo(){
    this.after("initialize", function(){
      this.$node.attr("disabled", true);
      this.on(this.attr.pencilButton, "click", this.enable);
      this.on(this.attr.canvasEl, "pencilUp", this.disable);
    });

    this.enable = function(e, eObj){
      this.$node.attr("disabled", false);
    };

    this.disable = function(e, eObj){
      this.$node.attr("disabled", true);
    };
  }

});
define(

[
  "flight/component",
  "hbs!templates/brushescombo"
],

function(defineComponent, tmpl){

  return defineComponent(BrushesCombo);

  function BrushesCombo(){
    var template = "";

    this.after("initialize", function(){
      // register events handler
      this.on(this.attr.pencilButton, "click", this.enable);
      this.on(this.attr.canvasEl, "brushesReady", this.updateBrushes);

      this.trigger(this.attr.canvasEl, "requestedBrushes");
    });

    this.enable = function(e, eObj){
      this.on(this.attr.canvasEl, "paintUp", this.disable);
      this.$node.attr("disabled", false);
    };

    this.disable = function(e, eObj){
      this.$node.attr("disabled", true);
    };

    this.updateBrushes = function(e, eObj){
      var brushes = eObj.brushes;

      // todo better method should be used
      this.$node.append(tmpl(brushes));
    };
  }

});
define(

[
  "flight/component",
  "hbs!templates/brushescombo"
],

function(defineComponent, tmpl){

  return defineComponent(BrushesCombo);

  function BrushesCombo(){
    var template = "";

    this.defaultAttrs({
      widgetEl: "brush-widget"
    });

    this.after("initialize", function(){
      var me = this;
      // register events handler
      this.on(this.attr.pencilButton, "click", this.enable);
      this.on(this.attr.canvasEl, "brushesReady", this.updateBrushes);
      this.on(this.attr.canvasEl, "brushSelectionChanged", this.updateBrushes);

      this.$node.delegate('li', 'click', function(){
        me.trigger(me.attr.canvasEl, "brushClicked", {
          brushId: $(this).attr("id")
        });
      });

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
      var widget = tmpl(eObj.brushes);

      // TODO find a better way to update the brushes and the selected
      // brush. The current implementation I think is horrible, because
      // we have to remove the existing widget, then add a new one.
      if (this.$node.children("#"+this.attr.widgetEl).length === 1) {
        this.$node.children("#"+this.attr.widgetEl).remove();
      }

      this.$node.append(widget);
      this.$node.children().first().attr("id", this.attr.widgetEl);
    };
  }
});
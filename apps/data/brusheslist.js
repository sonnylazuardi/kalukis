define(

[
  "flight/component"
],

function(defineComponent){

  return defineComponent(BrushesList);

  function BrushesList(){
    this.brushes = {
      defaultBrush: "pencil",
      selected: "pencil",
      brushes: [
        {value: "pencil", id: "brush-pencil"},
        {value: "sqribble", id: "brush-sqribble"},
        {value: "a", id: "brush-a"},
        {value: "b", id: "brush-b"}
      ]
    };

    this.after("initialize", function(){
      this.on("#"+this.$node.attr("id"), "requestedBrushes", function(){
        this.trigger("#"+this.$node.attr("id"), "brushesReady", {
          brushes: this.brushes
        });
      });
    });
  }
});
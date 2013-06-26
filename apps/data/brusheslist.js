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
      selectedId: "brush-pencil",
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

      this.on("#"+this.$node.attr("id"), "brushClicked", this.onBrushClicked);
    });

    this.onBrushClicked = function(e, eObj){
      this.brushes.selectedId = eObj.brushId;
      this.brushes.selected = this.findBrush(eObj.brushId);

      this.trigger("#"+this.$node.attr("id"), "brushSelectionChanged",{
        brushes: this.brushes
      });
    };

    this.findBrush = function(id){
      var found,
          brushes = this.brushes.brushes,
          length = brushes.length;

      while(length--){
        if(brushes[length].id === id){
          found = brushes[length].value;
          break;
        }
      }

      return found;
    };
  }
});
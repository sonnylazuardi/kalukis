/**
 * This component holds the list of brushes available.
 */
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
        {value: "pencil", id: "pencilBrush"},
        {value: "spray", id: "sprayBrush"},
        {value: "circle", id: "circleBrush"},
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

      this.on("#"+this.$node.attr("id"), "selectedBrushRequested", this.publishSelectedBrush);
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

    this.publishSelectedBrush = function(){
      var me = this,
          brushModule = "brushes/" + this.brushes.selectedId;

      // load the brush module
      require([brushModule], function(brush){
        me.trigger("#"+me.$node.attr("id"), "selectedBrushReady", {
          selected: me.brushes.selected,
          selectedId: me.brushes.selectedId,
          brush: brush
        });
      });
    };
  }
});
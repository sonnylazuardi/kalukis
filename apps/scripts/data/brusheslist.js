/**
 * This component holds the list of brushes available.
 */
define(function(require){
  var defineComponent = require("flight/component");

  return defineComponent(brushesList);

  function brushesList(){
    this.defaultAttrs({
      brushes: {
        defaultBrush: "pencil",
        selected: "pencil",
        selectedId: "pencilBrush",
        brushes: [
          {value: "pencil", id: "pencilBrush"},
          {value: "spray", id: "sprayBrush"},
          {value: "circle", id: "circleBrush"},
          {value: "vertical line", id: "verticalLineBrush"}
        ]
      }
    });

    this.after("initialize", function(){
      // somebody wants to know what brush is selected
      this.on(document, "brushesRequested", this.onBrushesRequested);
      this.on(document, "brushClicked", this.onBrushClicked);
      this.on(document, "selectedBrushRequested", this.onSelectedBrushRequested);
    });

    this.onBrushesRequested = function(e, eObj){
      this.trigger(document, "brushesReady", {
        brushes: this.attr.brushes
      });
    };

    this.onBrushClicked = function(e, eObj){
      var selected = this.findBrush(eObj.brushId);
      
      if (!selected){
        return;
      }

      this.attr.brushes.selectedId = eObj.brushId;
      this.attr.brushes.selected = selected;

      this.trigger(document, "brushSelectionChanged",{
        brushes: this.attr.brushes
      });

      this.publishSelectedBrush();
    };

    this.findBrush = function(id){
      var found,
          brushes = this.attr.brushes.brushes,
          length = brushes.length;

      while(length--){
        if(brushes[length].id === id){
          found = brushes[length].value;
          break;
        }
      }

      return found;
    };

    this.onSelectedBrushRequested = function(e, eObj){
      this.publishSelectedBrush();
    };

    this.publishSelectedBrush = function(){
      var me = this,
          brushModule = "brushes/" + this.attr.brushes.selectedId;

      // load the selected brush module
      // TODO what should happen when the specified brush
      // cannot be found?
      require([brushModule], function(brush){
        me.trigger(document, "selectedBrushReady", {
          selected: me.attr.brushes.selected,
          selectedId: me.attr.brushes.selectedId,
          brush: brush
        });
      });
    };
  }
});
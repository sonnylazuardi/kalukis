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
          {value: "Pencil", id: "pencilBrush"},
          {value: "Spray", id: "sprayBrush"},
          {value: "Circle", id: "circleBrush"},
          {value: "Hollow Circle", id: "hollowCircleBrush"},
          {value: "Hollow Square", id: "hollowSquareBrush"},
          {value: "Circular Pattern", id: "circularPatternBrush"}
        ]
      }
    });

    this.after("initialize", function(){
      // somebody wants to know what brush is selected
      this.on(document, "brushesRequested", this.onBrushesRequested);
      this.on(document, "brushClicked", this.onBrushClicked);
      this.on(document, "selectedBrushRequested", this.onSelectedBrushRequested);
    });

    /**
     * Publish the brushes
     */
    this.onBrushesRequested = function(e, eObj){
      this.trigger(document, "brushesReady", {
        brushes: this.attr.brushes
      });
    };

    /**
     * Indicates to our observer that the selected brush
     * has changed. We also need to publish the selected
     * brush instance
     */
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

    /**
     * Respond to selected brush query by publishing
     * the selected brush instance
     */
    this.onSelectedBrushRequested = function(e, eObj){
      this.publishSelectedBrush();
    };

    /**
     * Publish selected brush instance
     */
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
define(function(require){
  var fabric = require("fabric"),
      CircleBrush = require("brushes/circle"),
      canvas = new fabric.Canvas();

  describeComponent("services/brushManager", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Constructing the component", function(){

      it("Should publish request for canvas", function(){
        var spiedEvent = spyOnEvent('.component-root', "canvasRequested");

        this.component.initialize();
        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
        
      });

      it("Should setup the canvas", function(){
        setupComponent();
        $('.component-root').trigger("canvasRequestResponded", {
          id: "lukis",
          canvas: "canvas"
        });

        expect(this.component.attr.canvasId).toEqual("lukis");
        expect(this.component.attr.canvas).toEqual("canvas");
      });

    });

    describe("Brush Cache", function(){

      xit("Should save a brush to the cache once it has been created", function(){

      });

    });

    describe("Active Brush management", function(){

      it("Should listen to active brush changed event", function(){
        $('.component-root').on("activeBrushUpdated", function(e, data){
          expect(this.component.attr.activeBrush.id).toEqual("circle");
          expect(this.component.attr.activeBrush.brush).toBeInstanceOf(CircleBrush);
        }, this);

        $('.component-root').trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });
      });

      it("Should have set the properties of the activeBrush before sending it on activeBrushUpdated event", function(){
        // as if this brush had been created before
        this.component.attr.brushes["circle"] = new CircleBrush(canvas, {});

        this.component.attr.prop.width = 35;
        this.component.attr.prop.fillColor = "yellow";
        this.component.attr.prop.strokeColor = "yellow";

        $('.component-root').on("activeBrushUpdated", function(e, data){
          var brush = data.newActiveBrush.brush;

          expect(brush.get("width")).toEqual(35);
          expect(brush.get("fillColor")).toEqual("yellow");
          expect(brush.get("strokeColor")).toEqual("yellow");  
        });

        // should have changed now
        $('.component-root').trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });
      });

      it("Should set the active brush to first brushlist on the brushLoaded event data", function(){
        spyOn(this.component, "setActiveBrush");

        $('.component-root').trigger("brushesLoaded", {
          brushes: [{id: "pencil", name: "Pencil"}]
        });

        expect(this.component.setActiveBrush).toHaveBeenCalledWith("pencil");
      });

    });

    describe("Managing brush properties", function(){

      beforeEach(function(){
        this.component.attr.prop.fillColor = "#000000";
      });

      it("Should save the new brush property", function(){
        $('.component-root').trigger("brushPropertyChanged", {
          width: 20
        });
        expect(this.component.attr.prop.width).toEqual(20);
      });

      it("Should publish update regarding any changes in brush properties", function(){
        var spiedEvent = spyOnEvent('.component-root', "brushPropertyUpdated");

        $('.component-root').trigger("brushPropertyChanged", {
          fillColor: "red"
        });
        expect(this.component.attr.prop.fillColor).toEqual("red");
        expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');

        var eventData = spiedEvent.mostRecentCall.data;
        expect(eventData.key).toEqual("fillColor");
        expect(eventData.oldValue).toEqual("#000000");
        expect(eventData.newValue).toEqual("red");
      });

      it("Should publish brush properties when someone requested them", function(){
        var spiedEvent = spyOnEvent('.component-root', "brushPropertiesRequestResponded");

        $('.component-root').trigger("brushPropertiesRequested");
        expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');

      });

    });

  });
});
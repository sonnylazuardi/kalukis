define(function(require){
  var fabric = require("fabric"),
      CircleBrush = require("brushes/circle"),
      canvas = new fabric.Canvas();

  var async = new AsyncSpec(this);

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

      beforeEach(function(){
        this.component.attr.brushes = {};
      });

      it("Should save a brush to the cache once it has been created", function(){
        $('.component-root').on("activeBrushUpdated", function(){
          expect(Object.keys(this.component.attr.brushes).length).toEqual(1);
          expect(this.component.attr.brushes).toHaveOwnProperties("circle");
        }, this);

        this.component.requestBrush("circle");
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

    describe("Brush Event Request", function(){

      beforeEach(function(){
        this.component.attr.canvas = new fabric.Canvas();
      });

      async.it("Should publish a response when a brush is requested", function(done){

        $(".component-root").on("brushRequestResponded", function(e, data){
          expect(data.brush).toBeInstanceOf(CircleBrush);
          done();
        });

        $(".component-root").trigger("brushRequested", {
          id: "circle"
        });
        
      });

    });

  });
});
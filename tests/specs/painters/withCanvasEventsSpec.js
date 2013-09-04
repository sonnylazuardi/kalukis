define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      listeners = {
        onMouseUp: function(){},
        onMouseDown: function(){},
        onMouseMove: function(){}
      };

  describeMixin("painters/withCanvasEvents", function(){

    beforeEach(function(){
      setupComponent();
      this.component.attr.canvas = canvas;
    });

    describe("Attaching to canvas events", function(){

      beforeEach(function(){
        this.component.registerEventListeners(listeners);
      });

      afterEach(function(){
        this.component.unregisterExistingListeners();
      });

      it("Should have referenced the correct listeners", function(){
        expect(this.component.attr.listeners).toEqual(listeners);
      });

      it("Should invoke the registered listener for mouse:up", function(){
        spyOn(listeners, "onMouseUp");

        canvas.trigger("mouse:up");
        expect(listeners.onMouseUp).toHaveBeenCalled();
      });

      it("Should invoke the registered listener for mouse:down", function(){
        spyOn(listeners, "onMouseDown");

        canvas.trigger("mouse:down");
        expect(listeners.onMouseDown).toHaveBeenCalled();
      });

      it("Should invoke the registered listener for mouse:move", function(){
        spyOn(listeners, "onMouseMove");

        canvas.trigger("mouse:move");
        expect(listeners.onMouseMove).toHaveBeenCalled();
      });      

    });

    describe("Unregistering listeners", function(){

      beforeEach(function(){
        this.component.registerEventListeners(listeners);
      });

      afterEach(function(){
        this.component.unregisterExistingListeners();
      });

      it("Should unregister any existing listener", function(){
        spyOn(listeners, "onMouseUp");
        spyOn(listeners, "onMouseMove");
        spyOn(listeners, "onMouseDown");
        this.component.unregisterExistingListeners();

        expect(this.component.attr.listeners).toEqual({});

        canvas.trigger("mouse:up");
        expect(listeners.onMouseUp).not.toHaveBeenCalled();

        canvas.trigger("mouse:move");
        expect(listeners.onMouseMove).not.toHaveBeenCalled();

        canvas.trigger("mouse:down");
        expect(listeners.onMouseDown).not.toHaveBeenCalled();
      });

    });

  });

});

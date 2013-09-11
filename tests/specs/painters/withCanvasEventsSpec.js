define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      onMouseUpFired = false,
      onMouseDownFired = false,
      onMouseMoveFired = false,
      listeners = {
        onMouseUp: function(){
          onMouseUpFired = true;
        },
        onMouseDown: function(){
          onMouseDownFired = true;
        },
        onMouseMove: function(){
          onMouseMoveFired = true;
        }
      };

  describeMixin("painters/withCanvasEvents", function(){

    beforeEach(function(){
      setupComponent();
      this.component.attr.canvas = canvas;
    });

    describe("Attaching to canvas events", function(){

      beforeEach(function(){
        onMouseUpFired = false;
        onMouseDownFired = false;
        onMouseMoveFired = false;
        this.component.registerEventListeners(canvas, listeners);
      });

      afterEach(function(){
        this.component.unregisterExistingListeners(canvas);
      });

      it("Should have referenced the correct listeners", function(){
        expect(this.component.attr.listeners).toEqual(listeners);
      });

      it("Should invoke the registered listener for mouse:up", function(){
        canvas.trigger("mouse:up");
        expect(onMouseUpFired).toBeTruthy();
      });

      it("Should invoke the registered listener for mouse:down", function(){
        canvas.trigger("mouse:down");
        expect(onMouseDownFired).toBeTruthy();
      });

      it("Should invoke the registered listener for mouse:move", function(){
        canvas.trigger("mouse:move");
        expect(onMouseMoveFired).toBeTruthy();
      });      

    });

    describe("Unregistering listeners", function(){

      beforeEach(function(){
        onMouseUpFired = false;
        onMouseUpDownFired = false;
        onMouseMoveFired = false;
        this.component.registerEventListeners(canvas, listeners);
      });

      afterEach(function(){
        this.component.unregisterExistingListeners(canvas);
      });

      it("Should unregister any existing listener", function(){
        this.component.unregisterExistingListeners(canvas);

        expect(this.component.attr.listeners).toEqual({});

        canvas.trigger("mouse:up");
        expect(onMouseUpFired).toBeFalsy();

        canvas.trigger("mouse:move");
        expect(onMouseMoveFired).toBeFalsy();

        canvas.trigger("mouse:down");
        expect(onMouseDownFired).toBeFalsy();
      });

    });

  });

});

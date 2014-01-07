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

  describeMixin("painters/mixin/withCanvasEvents", function(){

    beforeEach(function(){
      setupComponent();
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
        onMouseDownFired = false;
        onMouseMoveFired = false;
        this.component.registerEventListeners(canvas, listeners);
      });

      afterEach(function(){
        this.component.unregisterExistingListeners(canvas);
      });

      it("Should unregister any existing listener", function(){
        this.component.unregisterExistingListeners(canvas);

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

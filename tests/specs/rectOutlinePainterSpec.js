define(

[
  "fabric",
  "outlinePainter/rect"
],

function(fabric, outlinePainter){

  describeComponent("ui/shapeBrush", function(){
    beforeEach(function(){
      setupComponent();
    });

    describe("Shape Brush", function(){
      describe("OutlinePainter Event Handling", function(){
        var handler = {
          mouseMove: function(){},
          mouseDown: function(){},
          mouseUp: function(){}
        },
        canvas = new fabric.Canvas("#test");

        it("Should listen to canvas' events", function(){
          this.component.trigger(document, "paintRequested", {
            painter: outlinePainter
          });

          spyOn(handler, "mouseMove");
          spyOn(handler, "mouseDown");
          spyOn(handler, "mouseUp");

          canvas.on("mouse:move", handler.mouseMove);
          canvas.on("mouse:down", handler.mouseDown);

          canvas.trigger("mouse:move");
          canvas.trigger("mouse:down");

          expect(handler.mouseMove).toHaveBeenCalled();
          expect(handler.mouseDown).toHaveBeenCalled();
        });

        it("Should not listen to canvas' events after finish executed", function(){
          spyOn(handler, "mouseMove");
          spyOn(handler, "mouseDown");
          spyOn(handler, "mouseUp");

          canvas.on("mouse:move", handler.mouseMove);
          canvas.on("mouse:down", handler.mouseDown);
          canvas.on("mouse:up", handler.mouseUp);
          // simulate a mouse-up event
          canvas.trigger("mouse:up");

          expect(handler.mouseUp).toHaveBeenCalled();

          canvas.trigger("mouse:move");
          canvas.trigger("mouse:down");

          expect(handler.mousMove).wasNotCalled();
          expect(handler.mousDown).wasNotCalled();
        });
      });
    });
  });
});

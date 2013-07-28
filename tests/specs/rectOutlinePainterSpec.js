define(

[
  "fabric",
  "outlinePainter/rect"
],

function(fabric, rectPainter){

  describeComponent("ui/rectPaintShape", function(){
    beforeEach(function(){
      setupComponent();
    });

    describe("Shape Brush", function(){
      describe("OutlinePainter Event Handling", function(){
        var canvas = new fabric.Canvas("#test"),
            outlinePainter;

        beforeEach(function(){
          outlinePainter = rectPainter.init(canvas);
        });

        it("Should listen to canvas' events", function(){
          spyOn(outlinePainter, "onMouseMove");
          spyOn(outlinePainter, "onMouseDown");

          canvas.on("mouse:move", outlinePainter.onMouseMove);
          canvas.on("mouse:down", outlinePainter.onMouseDown);

          canvas.trigger("mouse:move");
          expect(outlinePainter.onMouseMove).toHaveBeenCalled();

          canvas.trigger("mouse:down");
          expect(outlinePainter.onMouseDown).toHaveBeenCalled();
        });

        it("Should render Outline after mouse up", function(){
          spyOn(outlinePainter, "onMouseMove");
          spyOn(outlinePainter, "onMouseDown");
          spyOn(outlinePainter, "onMouseUp").andCallThrough();
          spyOn(outlinePainter, "finish").andCallThrough();
          spyOn(this.component, "afterFinishCallback");

          canvas.on("mouse:move", outlinePainter.onMouseMove);
          canvas.on("mouse:down", outlinePainter.onMouseDown);
          canvas.on("mouse:up", function(){
            outlinePainter.onMouseUp();
          });
          // simulate a mouse-up event
          canvas.trigger("mouse:up");
          expect(outlinePainter.onMouseUp).toHaveBeenCalled();
          expect(outlinePainter.finish).toHaveBeenCalled();
        });
      });
    });
  });
});

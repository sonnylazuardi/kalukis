define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("ui/rectPaintShape", function(){
    beforeEach(function(){
      setupComponent();
      this.component.attr.canvas = canvas;
    });

    describe("Brush Rect Widget", function(){
      it("Should set the canvas' cursor to crosshair", function(){
        var cursor,
            me = this;

        runs(function(){
          me.component.on("click", function(){
            cursor = me.component.attr.canvas.defaultCursor;
          });

          me.component.trigger("click");
        });

        waitsFor(function(){
          return cursor === "crosshair";
        }, "changing the crosshair", 1000);

        runs(function(){
          expect(me.component.attr.canvas.defaultCursor).toEqual("crosshair");
        });
      });
    });
  });
});


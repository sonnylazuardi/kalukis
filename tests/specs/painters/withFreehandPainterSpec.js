define(function(require){

  describeMixin("painters/withFreehandPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Active Brush events management", function(){

      it("Should save the active brush on activeBrushUpdated", function(){
        $(".component-root").trigger("brushServed", {
          brush: "brush"
        });

        expect(this.component.attr.activeBrush).toEqual("brush");
      });

    });

  });

});
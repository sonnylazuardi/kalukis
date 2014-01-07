define(function(require){

  describeMixin("painters/mixin/withFreehandPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Active Brush events management", function(){

      it("Should save the active brush on activeBrushUpdated", function(){
        $(".component-root").trigger("brush-served", {
          brush: "brush"
        });

        expect(this.component.attr.activeBrush).toEqual("brush");
      });

    });

  });

});
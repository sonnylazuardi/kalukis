describeMixin("painters/withBrushPainter", function(){

  beforeEach(function(){
    setupComponent();
  });

  describe("Brush Property Events", function(){

    it("Should have executed listeners for brushPropertyUpdated", function(){
      spyOn(this.component, "updateBrushProperty");

      $('.component-root').trigger("brushPropertyUpdated", {
        key: "fillColor",
        oldValue: "green",
        newValue: "red"
      });
      expect(this.component.updateBrushProperty).toHaveBeenCalled;

    });

  });

  describe("Brush Painting Flow", function(){

  });

});
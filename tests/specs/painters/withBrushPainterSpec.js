describeMixin("painters/withBrushPainter", function(){

  beforeEach(function(){
    setupComponent();
  });

  describe("Brush Property Events", function(){

    beforeEach(function(){
      $('.component-root').trigger("brushPropertyUpdated", {
        key: "fillColor",
        oldValue: "green",
        newValue: "red"
      });
    });

    it("Should have changed brush property", function(){
      expect(this.component.attr.prop.fillColor).toEqual("red");
    });

    it("Should not have changed the brush property if the event data aren't complete", function(){
      $('.component-root').trigger("brushPropertyUpdated", {
        key: "strokeColor"
      });

      expect(this.component.attr.prop.strokeColor).toEqual("#000000");
    });

  });

  describe("Brush Painting Flow", function(){

    beforeEach(function(){
      $('.component-root').trigger("activeBrushUpdated", {
        newActiveBrush: "newActive"
      });
    });

    it("Should have changed the active brush attribrute", function(){
      expect(this.component.attr.activeBrush).toEqual("newActive");
    });
  });

});
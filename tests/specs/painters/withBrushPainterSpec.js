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

  });

  describe("Brush Painting Flow", function(){

  });

});
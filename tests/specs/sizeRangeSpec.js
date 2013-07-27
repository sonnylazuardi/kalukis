describeComponent("ui/sizeRange", function(){
  beforeEach(function(){
    setupComponent();
  });

  describe("Size Ranget Widget", function(){
    describe("Init", function(){
      it("Should have the correct widget element's id", function(){
        expect(this.component.attr.widgetEl).toEqual("#paint-size-widget");
      });
    });
  });
});
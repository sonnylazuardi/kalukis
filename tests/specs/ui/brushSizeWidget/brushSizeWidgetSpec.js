describeComponent("ui/brushSizeWidget/brushSizeWidget", function(){

  beforeEach(function(){
    setupComponent();
  });

  describe("Rendering Template", function(){

    it("Should have rendered the template", function(){
      expect(this.$node.find("#brushsize-widget")).toExist();
    });

  });

});
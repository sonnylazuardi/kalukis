describeComponent("ui/brushSizeWidget/brushSizeWidget", function(){

  beforeEach(function(){
    setupComponent();
  });

  describe("Rendering Template", function(){

    it("Should have rendered the template", function(){
      expect(this.$node.find("#brushsize-widget")).toExist();
    });

  });

  describe("Events", function(){

    it("Should publish brushPropertyChanged", function(){
      var spiedEvent = spyOnEvent(document, "brushPropertyChanged");

      $("#brushsize-widget").val(25);
      expect(spiedEvent).toHaveBeenTriggeredOn(document);
    });
  });

});
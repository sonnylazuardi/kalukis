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

    xit("Should publish brushProperty-changed", function(done){
      $(document).on("brushProperty-changed", function(){
        done();
      });

      $("#brushsize-widget").val(25);
    });
  });

});
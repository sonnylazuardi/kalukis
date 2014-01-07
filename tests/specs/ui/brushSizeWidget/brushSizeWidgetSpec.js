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

    xit("Should publish change-brushProperty", function(done){
      $(document).on("change-brushProperty", function(){
        done();
      });

      $("#brushsize-widget").val(25);
    });
  });

});
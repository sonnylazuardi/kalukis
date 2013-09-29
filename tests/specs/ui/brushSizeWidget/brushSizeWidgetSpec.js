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

    var async = new AsyncSpec(this);

    async.it("Should publish brushPropertyChanged", function(done){
      $(document).on("brushPropertyChanged", function(){
        done();
      });

      $("#brushsize-widget").val(25);
    });
  });

});
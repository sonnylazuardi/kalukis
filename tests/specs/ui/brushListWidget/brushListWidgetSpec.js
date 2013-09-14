define(function(require){

  var brushes = require("text!data/brushes.json");

  describeComponent("ui/brushListWidget/brushListWidget", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Rendering Template", function(){
      beforeEach(function(){
        $(document).trigger("brushesLoaded", {
          brushes: JSON.parse(brushes)
        });
      });

      it("Should have rendered the template", function(){
        expect(this.component.$node).toContain("#brushlist-widget");
      });
    });

  });
});
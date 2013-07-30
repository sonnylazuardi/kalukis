define(function(require){
  var circleBrush = require("brushes/circleBrush");

  describe("With Outline Helper Mixin", function(){
    it("Should mixin itself to this brush", function(){
      expect(circleBrush).toHaveProperties("createOutline");
    });
  });
});
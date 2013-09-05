describeComponent("brushServices/brushManager", function(){

  describe("Listening to events", function(){

    beforeEach(function(){
      setupComponent("<div id='manager'></div>");
    });

    it("Should listen to brush property changed", function(){
      $('#manager').trigger("brushPropertyChanged", {
        width: 20
      });

      expect(this.component.attr.prop.width).toEqual(20);
    });

    it("Should publish update regarding any changes in brush properties", function(){

    });

  });

});
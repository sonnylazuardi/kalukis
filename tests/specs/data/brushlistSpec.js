describeComponent("data/brushList", function(){

  var spiedEvent;

  beforeEach(function(){
    spiedEvent = spyOnEvent(document, "brushes-loaded");
    setupComponent();
  });

  describe("Loading data", function(){

    it("Should have parsed the brushes correctly", function(){
      expect(this.component.attr.brushes[0].id).toEqual("circle");
      expect(this.component.attr.brushes[0].name).toEqual("Circle"); 
    });

    it("Should have published a brushLoaded event when the brushes have been fully loaded", function(){
      expect(spiedEvent).toHaveBeenTriggeredOn(document);

      var brushes = spiedEvent.mostRecentCall.data.brushes;
      expect(brushes.length).not.toEqual(0);
      expect(brushes[1].id).toEqual("rect");
      expect(brushes[1].name).toEqual("Rectangular");         
    });

  });

});
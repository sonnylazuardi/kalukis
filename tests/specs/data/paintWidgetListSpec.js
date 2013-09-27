describeComponent("data/paintWidgetList", function(){

  var spiedEvent;

  beforeEach(function(){
    spiedEvent = spyOnEvent(document, "paintWidgetsLoaded");
    setupComponent();
  });

  describe("Loading data", function(){
    describe("Loading data", function(){

    it("Should have loaded the paintWidgets data", function(){
      expect(this.component.attr.paintWidgets.length).not.toEqual(0);
    });

    it("Should have published a brushLoaded event when the paintWidgets have been fully loaded", function(){
      expect(spiedEvent).toHaveBeenTriggeredOn(document);
    });

  });
  });

});
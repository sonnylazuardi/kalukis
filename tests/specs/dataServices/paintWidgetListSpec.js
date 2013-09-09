describeComponent("dataServices/paintWidgetList", function(){

  var spiedEvent;

  beforeEach(function(){
    spiedEvent = spyOnEvent(document, "paintWidgetsLoaded");
    setupComponent();
  });

  describe("Loading data", function(){
    describe("Loading data", function(){

    it("Should have loaded the paintWidgets data", function(){
      expect(this.component.attr.paintWidgets.length).toEqual(7);
    });

    it("Should have parsed the paintWidgets correctly", function(){
      expect(this.component.attr.paintWidgets[0].id).toEqual("pencil");
      expect(this.component.attr.paintWidgets[0].title).toEqual("Pencil Brush"); 
    });

    it("Should have published a brushLoaded event when the paintWidgets have been fully loaded", function(){
      expect(spiedEvent).toHaveBeenTriggeredOn(document);

      var paintWidgets = spiedEvent.mostRecentCall.data.paintWidgets;
      expect(paintWidgets.length).toEqual(7);
      expect(paintWidgets[1].id).toEqual("line");
      expect(paintWidgets[1].title).toEqual("Paints Line");         
    });

  });
  });

});
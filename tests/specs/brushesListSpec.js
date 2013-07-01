describeComponent('data/brusheslist', function(){
  beforeEach(function(){
    setupComponent();
  });

  describe("Testing data provided on each event", function(){
    it("Should publish the correct brushes", function(){
      var eventSpy = spyOnEvent(document, "brushSelectionChanged");

      $(document).trigger("brushClicked", {brushId:"pencilBrush"});

      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });
});
describeComponent('data/brusheslist', function(){
  beforeEach(function(){
    setupComponent(document);
  });

  // describe("Testing data provided on each event", function(){
    it("Should publish the correct brushes", function(){
      var eventSpy = spyOnEvent(document, "brushSelectionChanged");
      console.log("im here");
      $(document).trigger("brushClicked", {brushId:"pencilBrush"});

      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  // });
});
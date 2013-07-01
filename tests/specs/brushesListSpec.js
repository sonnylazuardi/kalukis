describeComponent('data/brusheslist', function(){
  beforeEach(function(){
    setupComponent();
  });

  describe("Testing data provided on each event", function(){
    it("Should publish the correct brush that was selected", function(){
      var eventSpy = spyOnEvent(document, "brushSelectionChanged");
      $(document).trigger("brushClicked", {brushId:"pencilBrush"});

      expect(eventSpy).toHaveBeenTriggeredOn(document);

      var publishedBrush = eventSpy.mostRecentCall.data.brushes;

      expect(publishedBrush.selected).toEqual("pencil");
      expect(publishedBrush.selectedId).toEqual("pencilBrush");
    });

    it("Should not publish anything when non-existing brush was selected", function(){
      var eventSpy = spyOnEvent(document, "brushSelectionChanged"),
          called = false;

      $(document).trigger("brushClicked", {brushId:"xxxBrush"});

      expect(eventSpy).not.toHaveBeenTriggeredOn(document);
    });
  });
});
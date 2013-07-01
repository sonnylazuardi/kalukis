describeComponent('data/brusheslist', function(){
  describe("Testing brushSelectionChanged event", function(){
    beforeEach(function(){
      setupComponent();
    });

    it("Should publish the correct brush that was selected", function(){
      var eventSpy = spyOnEvent(document, "brushSelectionChanged");

      $(document).trigger("brushClicked", {brushId:"pencilBrush"});
      expect(eventSpy).toHaveBeenTriggeredOn(document);

      var publishedBrush = eventSpy.mostRecentCall.data.brushes;
      expect(publishedBrush.selected).toEqual("pencil");
      expect(publishedBrush.selectedId).toEqual("pencilBrush");
    });

    it("Should not publish anything when non-existing brush was selected", function(){
      var eventSpy = spyOnEvent(document, "brushSelectionChanged");

      $(document).trigger("brushClicked", {brushId:"xxxBrush"});
      expect(eventSpy).not.toHaveBeenTriggeredOn(document);
    });
  });

  describe("Testing selectedBrushReady event", function(){
    beforeEach(function(){
      setupComponent();
    });

    it("Should publish the correct brush that was selected", function(){
      var eventSpy = spyOnEvent(document, "selectedBrushReady");

      $(document).trigger("brushClicked", {brushId:"circleBrush"});
      expect(eventSpy).toHaveBeenTriggeredOn(document);

      // var publishedBrush = eventSpy.mostRecentCall.data;
      // expect(publishedBrush.selected).toEqual("pencil");
      // expect(publishedBrush.selectedId).toEqual("pencilBrush");
    });

    it("Should not publish anything when non-existing brush was selected", function(){
      var eventSpy = spyOnEvent(document, "selectedBrushReady");

      $(document).trigger("brushClicked", {brushId:"xxxBrush"});
      expect(eventSpy).not.toHaveBeenTriggeredOn(document);
    });
  });
});
describeComponent("ui/sizeRange", function(){
  beforeEach(function(){
    setupComponent();
  });

  describe("Size Ranget Widget", function(){
    describe("Init", function(){
      it("Should have the correct widget element's id", function(){
        expect(this.component.attr.widgetEl).toEqual("#paint-size-widget");
      });
    });

    describe("Events' Data", function(){
      it("Should publish the size data on paintSizeChanged event", function(){
        var eventSpy = spyOnEvent(document, "paintSizeChanged");
        $(this.component.attr.widgetEl).trigger("change");

        expect(eventSpy).toHaveBeenTriggeredOn(document);
        expect(eventSpy.mostRecentCall.data).toEqual({
          size: '10'
        });
      });
    });
  });
});
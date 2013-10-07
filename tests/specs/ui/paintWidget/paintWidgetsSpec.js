define(function(require){
  var paintWidgets = require("text!data/paintWidgets.json");

  describeComponent("ui/paintWidget/paintWidgets", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Rendering Template", function(){

      beforeEach(function(){
        $(document).trigger("paintWidgets-loaded", {
          paintWidgets: JSON.parse(paintWidgets)
        });
      });

      it("Should have rendered the template given the data", function(){
        expect(this.component.$node).toContain("#line");
      });

      it("Should only contains one list of widgets", function(){
        $(document).trigger("paintWidgets-loaded", {
          paintWidgets: JSON.parse(paintWidgets)
        });

        expect(this.$node.children().length).toEqual(1);
      });

    });

    describe("Event Handling", function(){

      beforeEach(function(){
        $(document).trigger("paintWidgets-loaded", {
          paintWidgets: JSON.parse(paintWidgets)
        });
      });

      it("Should have publish paintWidget-clicked with correct data", function(){
        var spiedEvent = spyOnEvent(document, "paintWidget-clicked");
        this.component.$node.find("#line").click();

        expect(spiedEvent).toHaveBeenTriggeredOn(document);

        var eventData = spiedEvent.mostRecentCall.data;
        expect(eventData.paintWidgetId).toEqual("line");
      });

    });

  });
});

define(function(require){
  var paintWidgets = require("text!data/paintWidgets.json");

  describeComponent("ui/paintWidget/paintWidgets", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Rendering Template", function(){

      beforeEach(function(){
        $(document).trigger("paintWidgetsLoaded", {
          paintWidgets: JSON.parse(paintWidgets)
        });
      });

      it("Should have rendered the template given the data", function(){
        expect(this.component.$node).toContain("#pencil");
      });

      it("Should only contains one list of widgets", function(){
        $(document).trigger("paintWidgetsLoaded", {
          paintWidgets: JSON.parse(paintWidgets)
        });

        expect(this.$node.children().length).toEqual(1);
      });

    });

    describe("Event Handling", function(){

      beforeEach(function(){
        $(document).trigger("paintWidgetsLoaded", {
          paintWidgets: JSON.parse(paintWidgets)
        });
      });

      it("Should have publish paintWidgetClicked with correct data", function(){
        var spiedEvent = spyOnEvent(document, "paintWidgetClicked");
        this.component.$node.find("#pencil").click();

        expect(spiedEvent).toHaveBeenTriggeredOn(document);

        var eventData = spiedEvent.mostRecentCall.data;
        expect(eventData.paintWidgetId).toEqual("pencil");
      });

    });

  });
});

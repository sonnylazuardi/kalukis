describeComponent("ui/brushesCombo", function(){
  beforeEach(function(){
    setupComponent();
  });

  var brushes = {
    defaultBrush: "pencil",
    selected: "pencil",
    selectedId: "pencilBrush",
    brushes: [
      {value: "pencil", id: "pencilBrush"},
      {value: "spray", id: "sprayBrush"},
      {value: "circle", id: "circleBrush"}
    ]
  };

  describe("BrushesCombo widget", function(){
    it("Should be shown", function(){
      $(document).trigger("brushesReady", {brushes: brushes});

      expect(this.component.select("#brush-widget")).toBeDefined();
    });
  });
});
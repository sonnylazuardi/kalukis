describeMixin("data/with_canvas", function(){
  beforeEach(function(){
    setupComponent();
  });

  it("Should have canvas and canvasEl", function(){
    expect(this.attr.canvas).toEqual("");
  });
});
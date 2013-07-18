describeComponent("ui/colorPicker", function(){
  beforeEach(function(){
    setupComponent();
  });

  it("Should have been rendered after initialization", function(){
    expect(this.component.select("#color-picker")).toBeDefined();
  });
});
define(["flight/component"], function(defineComponent){

  function CanvasMixin(){
    this.defaultAttrs({
      el: "",
      backgroundColor: "#ECF0F1",
      defaultCursor: 'default',
      hoverCursor: 'move',
      moveCursor: 'move',
      freeDrawingCursor: 'crosshair',
      rotationCursor: 'crosshair'
    });
  }

  return CanvasMixin;
});
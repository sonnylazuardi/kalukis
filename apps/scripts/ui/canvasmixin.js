define(["fabric","flight/component"], function(fabric,defineComponent){

  function CanvasMixin(){
    this.defaultAttrs({
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
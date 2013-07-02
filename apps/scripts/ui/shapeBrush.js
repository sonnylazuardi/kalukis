define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      fabric = require("fabric"),
      rect;

  return defineComponent(shapeBrush, withCanvas);

  function shapeBrush(){

    this.defaultAttrs({
      brush: {
        color: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "colorChanged", this.setBrushProperty);
    });

    this.setInitHandlers = function(){
      this.on(document, "canvasMouseDown", this.onMouseDown);
      this.on(document, "releasHandlersRequested", this.releaseHandlers);
      this.on(document, "selectedBrushReady", this.setBrush);
    };

    this.setPaintHandlers = function(){
      this.on(document, "canvasMouseMove", this.onMouseMove);
      this.on(document, "canvasMouseUp", this.onMouseUp);
    };

    this.releaseInitHandlers = function(){
      this.off(document, "canvasMouseDown");
      this.off(document, "releasHandlersRequested");
    };

    this.releasePaintHandlers = function(){
      this.off(document, "canvasMouseMove");
      this.off(document, "canvasMouseUp");
    };

    this.onClick = function(e, eObj){
      this.setInitHandlers();

      this.attr.canvas.selection = false;

      this.trigger(document, "paintRequested");
      this.trigger(document, "selectedBrushRequested");
    };

    this.onMouseDown = function(e, eObj){
      var point = this.attr.canvas.getPointer(eObj.e);

      rect = new fabric.Rect({
        top: point.y,
        left: point.x,
        width: 1,
        height: 1,
        stroke: "#000000",
        fill: null
      });

      this.attr.canvas.add(rect).renderAll();

      this.setPaintHandlers();
    };

    this.onMouseMove = function(e, eObj){
      var point = this.attr.canvas.getPointer(eObj.e),
          oCoords = rect.get('oCoords'),
          ox = oCoords.tl.x,
          oy = oCoords.tl.y,
          height = point.y - oy,
          width = point.x - ox,
          top = height / 2 + oy,
          left = width / 2 + ox;

      rect.set({
        top: top,
        left: left,
        height: height,
        width: width
      });

      this.attr.canvas.renderAll();
    };

    this.onMouseUp = function(e, eObj){
      this.trigger(document, "paintStopRequested");
      this.releaseHandlers();

      this.attr.canvas.renderAll();

      this.createShapeBrush();
    };

    this.createShapeBrush = function(e, eObj){
      var brushModule = "shapeBrush/rect-"+this.attr.brushId,
          me = this;

      // TODO what should happen when the brush cannot be loaded?
      require([brushModule], function(brush){
        brush.create(me.attr.canvas, {
          x: rect.get('oCoords').tl.x,
          y: rect.get('oCoords').tl.y,
          width: rect.get('width'),
          height: rect.get('height'),
          color: me.attr.brush.color
        });

        me.attr.canvas.remove(rect);
        rect = null;
      });
    };

    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
      this.attr.canvas.freeDrawingBrush[eObj.key] = eObj[eObj.key];
    };

    this.setBrush = function(e, eObj){
      this.attr.brushId = eObj.selectedId;
    };

    // set painting off
    this.releaseHandlers = function(){
      this.releaseInitHandlers();
      this.releasePaintHandlers();

      this.attr.canvas.selection = true;
    };
  }
});
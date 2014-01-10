define(function(require){

  var fabric = require('fabric'),
      asBrush = require('./asBrush');

  function PencilBrush(canvas, cfg){
    this.initialize(canvas, cfg);
  }

  PencilBrush.prototype.initBrush = function() {
    this.brush = new fabric.PencilBrush(this.canvas);
  };

  /**
   * Just an alias only for this brush
   * @param  {Object} points The drawing configuration
   */
  PencilBrush.prototype.drawAtPoints = function(outline) {
    var first = outline[0],
        type = first.type;

    if (type == 'Circle') {
      this.drawCircle(outline);
    } else if (type == 'Rect') {
      this.drawRect(outline);
    } else if (type == 'Line') {
      this.drawLine(outline);
    }
  };

  PencilBrush.prototype.drawRect = function(outline) {
    var rectOutline = outline[0].outline;

    this.canvas.add(new fabric.Rect({
      width: rectOutline.width,
      height: rectOutline.height,
      top: rectOutline.y,
      left: rectOutline.x,
      originX: 'left',
      originY: 'top',
      fill: null,
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.width || 10
    }));
    this.canvas.renderAll();
  };

  PencilBrush.prototype.drawCircle = function(outline) {
    var circleOutline = outline[0].outline;

    this.canvas.add(new fabric.Circle({
      radius: circleOutline.radius,
      left: circleOutline.x,
      top: circleOutline.y,
      originX: 'center',
      originY: 'center',
      fill: null,
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.width || 10
    }));
    this.canvas.renderAll();
  };

  PencilBrush.prototype.drawLine = function(outline) {
    var lineOutline = outline[0].outline;

    this.canvas.add(new fabric.Line([
      lineOutline.x1, lineOutline.y1,
      lineOutline.x2, lineOutline.y2
    ], {
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.width || 10,
      originX: 'center',
      originY: 'center'
    }));
    this.canvas.renderAll();
  };

  asBrush.call(PencilBrush.prototype);

  return PencilBrush;
});
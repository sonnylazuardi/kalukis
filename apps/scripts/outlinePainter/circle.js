define(function(require){

  return {
    canvas: undefined,

    isDrawing: false,

    brushColor: "#000000",

    outline: undefined,

    init: function(canvas, cfg){
      cfg = cfg || {};
      this.canvas = canvas;
      this.brushColor = cfg.color || "#000000";

      this.canvas.selection = false;
    },

    onMouseDown: function(e){
      var point = this.canvas.getPointer(e.e);

      this.outline = {
        x: point.x,
        y: point.y,
        radius: 1
      };

      this.isDrawing = true;
    },

    onMouseMove: function(e){
      if (this.isDrawing) {
        var point = this.canvas.getPointer(e.e);

        this.outline.radius = Math.sqrt(Math.pow(point.x-this.outline.x,2)+Math.pow(point.y-this.outline.y,2));

        this.renderOutline();
      }
    },

    onMouseUp: function(e){
      this.isDrawing = false;
      this.finish();
    },

    finish: function(){
      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.selection = true;
    },

    renderOutline: function(){
      var ctx = this.canvas.contextTop;
      ctx.save();

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.brushColor;
      ctx.arc(this.outline.x, this.outline.y, this.outline.radius, 2 * Math.PI, false);
      ctx.stroke();

      ctx.restore();
    }
  };
});
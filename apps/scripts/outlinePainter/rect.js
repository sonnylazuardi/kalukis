define(function(require){

  return {
    canvas: undefined,

    isDrawing: false,

    brushColor: "#000000",

    outline: undefined,

    init: function(canvas, cfg){
      this.canvas = canvas;
      this.brushColor = cfg.color || "#000000";

      this.canvas.selection = false;
    },

    onMouseDown: function(e){
      var point = this.canvas.getPointer(e.e);

      this.outline = {
        x: point.x,
        y: point.y,
        width: 1,
        height: 1
      };

      this.isDrawing = true;
    },

    onMouseMove: function(e){
      if (this.isDrawing) {
        var point = this.canvas.getPointer(e.e);

        this.outline.height = point.y - this.outline.y;
        this.outline.width = point.x - this.outline.x;

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

      ctx.lineWidth = 1;
      ctx.strokeStyle = this.brushColor;
      ctx.strokeRect(this.outline.x, this.outline.y, this.outline.width, this.outline.height);

      ctx.restore();
    }
  };
});
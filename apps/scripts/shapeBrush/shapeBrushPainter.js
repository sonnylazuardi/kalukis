define(function(require){

  return {
    init: function(canvas, cfg){
      this.canvas = canvas;
      this.brushColor = cfg.color || "#000000";

      this.canvas.selection = false;
    },

    onMouseDown: function(e){
      var point = this.canvas.getPointer(e);

      this.rect = {
        x: point.x,
        y: point.y,
        width: 1,
        height: 1
      };
    },

    onMouseMove: function(e){
      var point = this.canvas.getPointer(e);

      this.rect.height = point.y - rect.y;
      this.rect.width = point.x - rect.x;

      this.renderOutline();
    },

    onMouseUp: function(e){
      this.finishing();
    },

    finishing: function(){
      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.selection = true;
    },

    renderOutline: function(){
      var ctx = this.canvas.contextTop;
      ctx.save();

      ctx.lineWidth = 1;
      ctx.strokeStyle = this.brushColor;
      ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

      ctx.restore();
    }
  };
});
/**
 * I know how to manage the painting of an object
 * which uses a specific brush. Therefore, I also know
 * which brush to use.
 */
define(function(require){

  return withBrushPainter;

  function withBrushPainter(){

    /**
     * Paints the object with the active brush instance
     * @param  {Object} canvas The canvas instance
     * @param  {Array} points Points
     */
    this.startBrushPainting = function(canvas, brush, points){
      brush.drawAtPoints(points);
      canvas.renderAll();

      this.finalizePainting(brush);
    };

    /**
     * The final steps after object has been drawn
     */
    this.finalizePainting = function(brush){
      this.trigger("brushPaintingFinished", {
        brush: brush
      });
    };

  }

});
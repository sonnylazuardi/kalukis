define(function(require){
  return {
    create: function(canvas, cfg, callback){
      if (!cfg.x1 || !cfg.x2 || !cfg.y1 || !cfg.y2){
        throw new Error("Required params not provided");
      }
      // load the brush
      require(["brushes/"+cfg.brush], function(brsh){
        brsh.createShapeBrush(canvas, cfg);

        if (typeof callback === "function") {
          callback.call(this, brsh);
        }
      });
    }
  };
});
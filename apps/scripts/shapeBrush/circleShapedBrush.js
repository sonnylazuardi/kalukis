define(function(require){
  return {
    create: function(canvas, cfg, callback){
      if (!cfg.x || !cfg.y || !cfg.radius){
        throw new Error("Required params not supplied");
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
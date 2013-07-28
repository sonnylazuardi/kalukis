define(function(require){
  return {
    create: function(canvas, cfg, callback){
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
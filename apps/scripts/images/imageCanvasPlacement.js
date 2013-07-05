define(function(require){
  var fabric = require("fabric");

  function placeImage(canvas, cfg){
    // load image
    fabric.Image.fromURL(url, function(img){
      // set image properties
      img.set({
        top: cfg.y,
        left: cfg.x,
        width: cfg.width,
        height: cfg.height
      });
      // add image to canvas and then render the canvas
      canvas.add(img).renderAll();
    });
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height || !cfg.url){
        throw new Error("Required params not provided");
      }
    }
  };
});
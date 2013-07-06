define(function(require){
  var fabric = require("fabric");

  // TODO failure handling
  function placeImage(canvas, cfg, callback){
    var reader = new FileReader();

    reader.onload = function(e){
      var img = new Image();

      img.onload = function(){
        var image = new fabric.Image(img);
        image.set({
          top: cfg.y + cfg.height / 2,
          left: cfg.x + cfg.width / 2,
          width: cfg.width,
          height: cfg.height
        });

        // add image to canvas and then render the canvas
        canvas.add(image).renderAll();

        if (typeof callback === "function"){
          callback.call(this);
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(cfg.file);
  }

  return {
    create: function(canvas, cfg, callback){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height || !cfg.url){
        throw new Error("Required params not provided");
      }

      placeImage(canvas, cfg, callback);
    }
  };
});
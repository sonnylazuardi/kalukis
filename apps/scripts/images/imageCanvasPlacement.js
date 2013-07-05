define(function(require){
  var fabric = require("fabric");

  function placeImage(canvas, cfg){
    var reader = new FileReader();

    reader.onload = function(e){
      var img = new Image();

      img.onload = function(){
        var image = new fabric.Image(img);
        console.log(cfg);
        image.set({
          top: cfg.y + cfg.height / 2,
          left: cfg.x + cfg.width / 2,
          width: cfg.width,
          height: cfg.height
        });

        console.log(image);
        // add image to canvas and then render the canvas
        canvas.add(image).renderAll();
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(cfg.file);
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height || !cfg.url){
        throw new Error("Required params not provided");
      }

      placeImage(canvas, cfg);
    }
  };
});
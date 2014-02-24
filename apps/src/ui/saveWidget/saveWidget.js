define(function(require){

  var defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/saveWidget/template.html');

  return defineComponent(saveWidget);

  function saveWidget() {

    this.defaultAttrs({
      saveWidgetEl: '#savewidget'
    });

    this.after('initialize', function(){
      this.renderTemplate();
      this.attachEventListeners();
    });

    this.renderTemplate = function(){
      this.$node.append(tmpl);
    };

    this.attachEventListeners = function(){
      this.on('click', {
        saveWidgetEl: this.aksiSave,
      });
    };

    // this.imageToDataUri = function (img, width, height, quality) {

    //   /// create an off-screen canvas
    //   var canvas = document.createElement('canvas'),
    //       ctx.getContext('2d');

    //   /// set its dimension to target size
    //   canvas.width = width;
    //   canvas.height = height;

    //   /// draw source image into the off-screen canvas:
    //   ctx.drawImage(img, 0, 0, width, height);

    //   /// encode image to data-uri with base64 version of compressed image
    //   return canvas.toDataURL('image/jpeg', quality);
    // }

    this.aksiSave = function() {
      var canvas = document.getElementById('lukis');
      var context = canvas.getContext('2d');

      // canvas.width = 400;
      // canvas.height = 300;
      window.open(canvas.toDataURL('image/jpeg', 0.6));
    }
  }

});
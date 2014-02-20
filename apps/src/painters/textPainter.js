
define(function(require) {
  var fabric = require('fabric'),
      defineComponent = require('flight/lib/component');

  return defineComponent(textPainter);

  function textPainter() {

    this.defaultAttrs({

      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
    });

    this.after('initialize', function() {
      this.attachEventListeners();
    });

    this.attachEventListeners = function() {
      this.on('canvas-ready', function( e, data ) {
        this.setCanvas(data.canvas);
      }.bind(this));

      // mapping paintWidget-clicked event to activeOutlineShape-changed
      this.on('textWidget-clicked', function(e, data) {
        var x;
        var text = prompt("Please Write a Text : ","Hello World");
        if (text!=null)
        {
            var textCanvas = new fabric.Text(text, { left: 100, top: 100 });
            this.attr.canvas.add(textCanvas);  
        }
        
        // console.log(fabric);
      }.bind(this));

    };

    /**
     * Savint the canvas instance
     * @param  {Object} canvas Canvas instance
     */
    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };
  }
});
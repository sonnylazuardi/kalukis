
define(function(require) {
  var fabric = require('fabric'),
      defineComponent = require('flight/lib/component');

  return defineComponent(textPainter);
  var self;
  function textPainter() {

    this.defaultAttrs({

      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
      _socket: undefined
    });

    this.after('initialize', function() {
      this.attachEventListeners();
      self = this;
      this.attr._socket.on('createText', function(data) {
        console.log('create text');
        self.addText(data);
      });

      this.attr._socket.on('controlObject', function(data) {
        // console.log("control object");
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]);
          self.attr.canvas.item(i).setAngle(parseInt(data[i].angle, 10)).setCoords();
          self.attr.canvas.item(i).setScaleX(parseFloat(data[i].scaleX)).setCoords();
          self.attr.canvas.item(i).setScaleY(parseFloat(data[i].scaleY)).setCoords();
          self.attr.canvas.item(i).setLeft(parseInt(data[i].left, 10)).setCoords();
          self.attr.canvas.item(i).setTop(parseInt(data[i].top, 10)).setCoords();
        };
        self.attr.canvas.renderAll();
      });
    });

    this.attachEventListeners = function() {
      this.on('canvas-ready', function( e, data ) {
        this.setCanvas(data.canvas);
      }.bind(this));

      // mapping paintWidget-clicked event to activeOutlineShape-changed
      this.on('textWidget-clicked', function(e, data) {
        var text = prompt("Please Write a Text : ","Hello World");
        this.addText(text);
        this.attr._socket.emit('createText', text);
        this.attr.canvas.forEachObject(function(o) {
          console.log(o);
        });
      }.bind(this));  

    };

    this.addText = function(text) {
      if (text!=null)
      {
          var textCanvas = new fabric.Text(text, { left: 100, top: 100 });
          this.attr.canvas.add(textCanvas);  
      }
      // console.log(fabric);
    }

    this.updateControls = function() {
      var objects = this.getObjects();
      self.attr._socket.emit('controlObject', objects);
    }
    /**
     * Savint the canvas instance
     * @param  {Object} canvas Canvas instance
     */
    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
      this.attr.canvas.on({
        'object:moving': this.updateControls,
        'object:scaling': this.updateControls,
        'object:resizing': this.updateControls,
        'object:rotating': this.updateControls
      });
    };
  }
});
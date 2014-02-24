
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
      _socket: undefined,
      context: undefined
    });

    this.after('initialize', function() {
      this.attachEventListeners();
      self = this;
      this.attr.context = this;
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

        var newWindow = window.open('textWidget.html',"_blank","width=450,height=350");
        newWindow.addText = function(text, font, size, bold, italic, underlined){

          self.addText(text,font,size,bold,italic,underlined);
            self.attr._socket.emit('createText', text);
            self.attr.canvas.forEachObject(function(o) {
            });
        }


        //var text = newWindow.document.getElementById('option1').value;
        // var text = newWindow.document.SendToParent();
        //alert(document.getElementById);
        
      }.bind(this));  

    };

    this.addText = function(text,font,size,bold,italic,underlined) {
      if (text!=null)
      {
          var _bold, _italic, _underlined;

          if (bold == true) {_bold = "bold";}
          else {_bold = "normal";}
          if (italic) {_italic = "italic";}
          else {_italic = "normal"}
          if (underlined) {_underlined = "underline";}
          else {_underlined = "normal"}
              
          var textCanvas = new fabric.Text(text, { 
            left: 100, top: 100 , fontFamily: font, fontSize:size, textDecoration: _underlined, fontStyle: _italic, fontWeight: _bold
          });
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
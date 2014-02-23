/**
 * I can clean the canvas
 */
define(function(require) {

  var defineComponent = require('flight/lib/component'),
      fabric = require('fabric');

  return defineComponent(cleaner);
  var self;
  function cleaner() {

    this.defaultAttrs({
      canvas: undefined,
      _socket: undefined
    });

    this.after('initialize', function() {
      this.attachEventListener();
      self = this;
      this.attr._socket.on('canvasClear', function(data) {
        console.log('canvas clear');
        self.clearHandler();
      });
      this.attr._socket.on('canvasRemove', function(data) {
        console.log('canvas remove');
        var canvas = self.attr.canvas;
        if (data.tipe == 'group') {
          var objects = canvas.getObjects();
          for (var i = 0; i < objects.length; i++) {
            if (data.objects.indexOf(i) != -1) {
              canvas.remove(objects[i]);
            }
          };
        } else if (data.tipe == 'object') {
          canvas.remove(canvas.item(data.objects));
        }
        canvas.renderAll();
      });
    });

    this.getObjectId = function(Object) {
      var objects = self.attr.canvas.getObjects();
      for (var i = 0; i < objects.length; i++) {
        if (objects[i] == Object) {
          return i;
        }
      };
      return -1;
    }
    this.getObjectsId = function(Objects) {
      var objects = self.attr.canvas.getObjects();
      var larik = [];
      for (var i = 0; i < objects.length; i++) {
        for (var j = 0; j < Objects.length; j++) {
          if (objects[i] == Objects[j]) {
            larik.push(i);
          }
        };
      };
      return larik;
    }

    this.attachEventListener = function() {
      this.on('canvasManipulation-clicked', function(e, data) {
        if (this[data.manipulationId + 'Handler']) {
          if (data.manipulationId == 'clear' && !data.shirt) {
            self.attr._socket.emit('canvasClear');
          } else if (data.manipulationId == 'remove') {
            var tipe, objects;
            var canvas = self.attr.canvas;
            if (canvas.getActiveGroup()) {
              objects = this.getObjectsId(canvas.getActiveGroup());
              tipe = 'group';
            } else if (canvas.getActiveObject()) { 
              objects = this.getObjectId(canvas.getActiveObject());
              tipe = 'object';
            }
            console.log(objects);
            self.attr._socket.emit('canvasRemove', {tipe: tipe, objects: objects});
          }
          this[data.manipulationId + 'Handler'].apply(this, data);
        }
      });

      this.on('canvas-ready', function(e, data) {
        this.setCanvas(data.canvas);
      }.bind(this));
    };

    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };

    /**
     * Removing action
     */
    this.removeHandler = function() {
      var canvas = this.attr.canvas;

      if (canvas) {
        if (canvas.getActiveGroup()) {
          // if group selection is active
          canvas.getActiveGroup().forEachObject(function(obj) {
            canvas.remove(obj);
          });

          canvas.discardActiveGroup();
        } else if (canvas.getActiveObject()) {
          // if only individual object is selected
          canvas.remove(canvas.getActiveObject());
        }

        canvas.renderAll();
      }
    };

    this.canvasRemove = function(data) {

    }

    /**
     * Clearing action
     */
    this.clearHandler = function() {
      if (this.attr.canvas) {
        this.attr.canvas.clear();
      }
    };

  }

});
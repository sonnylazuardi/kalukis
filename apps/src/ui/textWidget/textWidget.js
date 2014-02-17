define(function(require){

  var defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/textWidget/template.html'),
      fabric = require('fabric').fabric;

  return defineComponent(TextWidget);

  function TextWidget() {

    this.defaultAttrs({
      textWidgetEl: '#textwidget'
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
        textWidgetEl: this.aksiTexting,
      });
    };

    this.aksiTexting = function() {
      //var canvas = document.getElementById('lukis');
      this.trigger(document, 'textWidget-clicked');
      //var text = new fabric.Text('hello world', { left: 100, top: 100 });
      //canvas.add(text);
    }

  }

});
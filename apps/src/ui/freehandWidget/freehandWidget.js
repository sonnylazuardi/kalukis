define(function(require){

  var defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/freehandWidget/template.html');

  return defineComponent(FreehandWidget);

  function FreehandWidget() {

    this.defaultAttrs({
      freehandWidgetEl: '#freehandwidget'
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
        freehandWidgetEl: this.initFreehandPainting
      });
    };

    this.initFreehandPainting = function(){
      this.trigger(document, 'request-freehandPainting');
    };

  }

});
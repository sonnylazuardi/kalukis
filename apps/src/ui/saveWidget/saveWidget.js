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

    this.aksiSave = function() {
      var canvas = document.getElementById('lukis');
      var context = canvas.getContext('2d');

      window.open(canvas.toDataURL('image/png'));
    }
  }

});
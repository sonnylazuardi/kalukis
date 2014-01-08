/**
 * I'am responsible to handle user event on changing the
 * brush distance
 */
define(function(require){

  var defineComponent = require('flight/lib/component'),
      mustache = require('mustache'),
      tmpl = require('text!./template.html');

  return defineComponent(brushSensitivityWidget);

  function brushSensitivityWidget(){

    this.defaultAttrs({
      sensitivity: 1,
      brushSensitivityEl: '#brushsensitivity-widget',
      brushSensitivityInfoEl: '.brushsensitivity-info'
    });

    this.after('initialize', function(){
      this.renderWidget({value: this.attr.sensitivity});
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on('change', {
        brushSensitivityEl: this.brushsensitivityChanged
      });
    };

    this.renderWidget = function(data){
      var widget = mustache.render(tmpl, data);

      if (this.$node.children().length) {
        this.$node.children().replaceWith(widget);
      } else {
        this.$node.append(widget);
      }
    };

    this.brushsensitivityChanged = function(e, data){
      var sensitivity = parseInt(e.target.value, 10);

      this.select('brushSensitivityInfoEl').html(sensitivity);
      this.trigger(document, 'change-brushProperty', {
        sensitivity: sensitivity
      });
    };

  }

});
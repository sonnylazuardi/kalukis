/**
 * I'am responsible to handle user event on changing the
 * brush size on the brushSizeWidget
 */
define(function(require){

  var defineComponent = require('flight/lib/component'),
      mustache = require('mustache'),
      tmpl = require('text!ui/brushSizeWidget/template.html');

  return defineComponent(brushSizeWidget);

  function brushSizeWidget(){

    this.defaultAttrs({
      width: 10,
      brushSizeWidgetEl: '#brushsize-widget',
      brushSizeInfoEl: '.brushsize-info'
    });

    this.after('initialize', function(){
      this.renderWidget({value: this.attr.width});
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on('change', {
        brushSizeWidgetEl: this.brushSizeChanged
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

    this.brushSizeChanged = function(e, data){
      var size = parseInt(e.target.value, 10);

      this.select('brushSizeInfoEl').html(size)
      this.trigger(document, 'change-brushProperty', {
        width: size
      });
    };

  }

});
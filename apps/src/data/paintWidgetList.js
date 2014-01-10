/**
 * Holds the list of paintWidgets available to choose from
 */
define(function(require) {

  var defineComponent = require('flight/lib/component'),
      paintWidgets = require('text!data/paintWidgets.json');

  return defineComponent(paintWidgetList);

  function paintWidgetList() {

    this.defaultAttrs({

      paintWidgets: []

    });

    this.after('initialize', function() {
      this.attachPaintWidgets();
    });

    this.attachPaintWidgets = function() {
      this.attr.paintWidgets = JSON.parse(paintWidgets);
      this.trigger('paintWidgets-loaded', {
        paintWidgets: this.attr.paintWidgets
      });
    };
    
  }

});
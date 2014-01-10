/**
 * Holds the list of canvasManipulationOperations
 */
define(function(require) {

  var defineComponent = require('flight/lib/component'),
      canvasManipulationOperations = require('text!data/canvasManipulationOperations.json');

  return defineComponent(paintWidgetList);

  function paintWidgetList() {

    this.defaultAttrs({

      canvasManipulationOperations: []

    });

    this.after('initialize', function() {
      this.attachCanvasManipulationOperations();
    });

    this.attachCanvasManipulationOperations = function() {
      this.attr.canvasManipulationOperations = JSON.parse(canvasManipulationOperations);
      this.trigger('canvasManipulationOperations-loaded', {
        canvasManipulationOperations: this.attr.canvasManipulationOperations
      });
    };
    
  }

});
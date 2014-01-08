/**
 * Holds the list of brushes available to choose from
 */
define(function(require){

  var defineComponent = require('flight/lib/component'),
      brushes = require('text!data/brushes.json')

  return defineComponent(brushlist);

  function brushlist(){

  this.defaultAttrs({

      brushes: []

    });

    this.after('initialize', function(){
      this.attachBrushes();
    });

    this.attachBrushes = function(){
      this.attr.brushes = JSON.parse(brushes);
      this.trigger('brushes-loaded', {
        brushes: this.attr.brushes
      });
    };
    
  }

});
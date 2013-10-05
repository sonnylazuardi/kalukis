define(function(require){

  var defineComponent = require("flight/lib/component"),
      tmpl = require("text!./template.html"),
      mustache = require("mustache");

  return defineComponent(brushPanel);

  function brushPanel() {

    this.defaultAttrs({

    });

    this.after("initialize", function(){
      
    });

  }

});
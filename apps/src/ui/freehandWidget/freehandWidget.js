define(function(require){

  var defineComponent = require("flight/lib/component"),
      tmpl = require("text!ui/freehandWidget/template.html");

  return defineComponent(FreehandWidget);

  function FreehandWidget() {

    this.after("initialize", function(){
      this.renderTemplate();
      this.attachEventListeners();
    });

    this.renderTemplate = function(){
      this.$node.append(tmpl);
    };

    this.attachEventListeners = function(){

    };

  }

});
define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/paintWidget/template.html");

  return defineComponent(paintWidgets);

  function paintWidgets(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("click", this.publishClickedPaintWidget);

      this.on("brushlistUpdated", this.renderTemplate);
    };

    this.publishClickedPaintWidget = function(e, data){
      this.trigger(document, "paintWidgetClicked");
    };

    this.renderTemplate = function(e, data){

    };
    
  }

});
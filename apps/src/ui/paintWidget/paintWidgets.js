define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/paintWidget/template.html");

  return defineComponent(paintWidgets);

  function paintWidgets(){

    this.defaultAttrs({
      paintWidgetElId: "paintWidgetsCollection"
    });

    this.after("initialize", function(){
      this.appendPaintWidgetEl();
      this.attachEventListeners();
    });

    this.appendPaintWidgetEl = function(){
      this.$node.append("<div id='" + this.attr.paintWidgetElId + "'></div>");
    };

    this.attachEventListeners = function(){
      this.on("click", this.publishClickedPaintWidget);

      this.on("paintWidgetsLoaded", this.renderTemplate);
    };

    this.publishClickedPaintWidget = function(e, data){
      this.trigger(document, "paintWidgetClicked");
    };

    this.renderTemplate = function(e, data){

    };
    
  }

});
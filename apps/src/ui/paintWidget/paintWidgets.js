define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/paintWidget/template.html");

  return defineComponent(paintWidgets);

  function paintWidgets(){

    this.defaultAttrs({
      paintWidgetElId: "paintWidgetsCollection",

      widgetList: undefined
    });

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("click", this.publishClickedPaintWidget);

      this.on(document, "paintWidgetsLoaded", this.renderTemplate);
    };

    this.publishClickedPaintWidget = function(e, data){
      this.trigger(document, "paintWidgetClicked", data);
    };

    this.renderTemplate = function(e, data){
      var widgetList = mustache.render(tmpl, data);
      if (this.$node.children().length) {
        this.$node.children().replaceWith(widgetList)
      } else {
        this.$node.append(widgetList);
      }
    };
    
  }

});
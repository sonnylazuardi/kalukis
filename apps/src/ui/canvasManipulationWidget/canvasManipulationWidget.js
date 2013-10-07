define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/canvasManipulationWidget/template.html");

  return defineComponent(canvasManipulationWidget);

  function canvasManipulationWidget(){

    this.defaultAttrs({
      canvasManipulationWidgetEl: "#canvasmanipulation-list"
    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    this.attachEventListener = function(){
      this.on("click", {
        canvasManipulationWidgetEl: this.publishClickedWidget
      });

      this.on(document, "canvasManipulationOperations-loaded", this.renderTemplate);
    };

    this.publishClickedWidget = function(e){
      if (e.target.id){
        this.trigger(document, "canvasManipulation-clicked", {
          manipulationId: e.target.id
        });
      }
    };

    this.renderTemplate = function(e, data){
      var widgetList = mustache.render(tmpl, data);

      if (this.select("canvasManipulationWidgetEl").length){
        this.select("canvasManipulationWidgetEl").replaceWith(widgetList);
      } else {
        this.$node.append(widgetList);
      }
    };
  }

});
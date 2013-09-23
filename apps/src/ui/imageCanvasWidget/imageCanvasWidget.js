define(function(require){

  var defineComponent = require("flight/lib/component"),
      tmpl = require("text!ui/imageCanvasWidget/template.html");

  return defineComponent(imageCanvasWidget);

  function imageCanvasWidget() {

    this.defaultAttrs({
      imageCanvasWidgetEl: "#imagecanvaswidget"
    });

    this.after("initialize", function(){
      this.renderTemplate();
      this.attachEventListeners();
    });

    this.renderTemplate = function(){
      this.$node.append(tmpl);
    };

    this.attachEventListeners = function(){
      this.on("click", {
        imageCanvasWidgetEl: this.requestImageAddition
      });
    };

    this.requestImageAddition = function(){
      this.trigger(document, "imageWidgetClicked");
    };

  }

});
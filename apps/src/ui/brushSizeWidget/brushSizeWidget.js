define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/brushSizeWidget/template.html");

  return defineComponent(brushSizeWidget);

  function brushSizeWidget(){

    this.defaultAttrs({
      width: 10
    });

    this.after("initialize", function(){
      this.renderWidget({value: this.attr.width});
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("change", this.brushSizeChanged);
    };

    this.renderWidget = function(data){
      var widget = mustache.render(tmpl, data);

      if (this.$node.children().length) {
        this.$node.children().replaceWith(widget);
      } else {
        this.$node.append(widget);
      }
    };

    this.brushSizeChanged = function(e, data){
      var size = e.target.value;
      this.trigger(document, "brushPropertyChanged", {
        width: parseInt(size, 10)
      });
    };

  }

});
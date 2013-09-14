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
    });

    this.renderWidget = function(data){
      var widget = mustache.render(tmpl, data);

      if (this.$node.children().length) {
        this.$node.children().replaceWith(widget);
      } else {
        this.$node.append(widget);
      }
    };

  }

});
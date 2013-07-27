/**
 * Manages user interaction with sizerange widget
 */
define(function(require){
  var defineComponent = require("flight/component"),
      tmpl = require("text!templates/sizerange.html");

  return defineComponent(sizeRange);

  function sizeRange(){
    this.defaultAttrs({
      size: 0,
      widgetEl: ""
    });

    this.after("initialize", function(){
      // init widget property
      this.$node.append(tmpl);
      this.attr.widgetEl = "#" + $(tmpl).attr("id");
      this.attr.size = $(tmpl).val();

      this.on("change", this.onChange);
  });

    this.onChange = function(e){
      this.trigger(document, "paintSizeChanged", {
        size: (this.attr.size = e.target.value)
      });
    };
  }
});
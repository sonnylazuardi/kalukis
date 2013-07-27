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
      this.$node.append(tmpl);
      this.attr.widgetEl = "#" + $(tmpl).attr("id");
      this.on("change", this.onChange);
  });

    this.onChange = function(e, eObj){
      this.trigger(document, "paintSizeChanged");
    };
  }
});
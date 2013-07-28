/**
 * Manages user interaction with sizerange widget
 */
define(function(require){
  var defineComponent = require("flight/component"),
      tmpl = require("text!templates/sizerange.html");

  return defineComponent(sizeRange);

  function sizeRange(){
    this.defaultAttrs({
      width: 0,
      widgetEl: ""
    });

    this.after("initialize", function(){
      // init widget property
      this.$node.append(tmpl);
      this.attr.widgetEl = "#" + this.$node.children("input").first().attr("id");
      this.attr.width = this.$node.children("input").first().val();

      this.on("change", this.onChange);
      this.on(document, "paintSizeSetRequested", this.setPaintSize);
    });

    // publish the new paint width
    this.onChange = function(e){
      this.trigger(document, "brushPropertyChanged", {
        key: "width",
        width: (this.attr.width = parseInt(e.target.value))
      });
    };

    // change paint width
    this.setPaintSize = function(e, eObj){
      $(this.attr.widgetEl).val((this.attr.width = eObj.width));
    };
  }
});
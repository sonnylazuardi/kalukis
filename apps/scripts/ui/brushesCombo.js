/**
 * The brush combobox component. It shows the list of brushes available.
 */
define(function(require){
  var defineComponent = require("flight/component"),
      mustache = require("mustache"),
      tmpl = require("text!templates/brushescombo.html");

  return defineComponent(brushesCombo);

  function brushesCombo(){
    var template = "";

    this.defaultAttrs({
      widgetEl: ""
    });

    this.after("initialize", function(){
      var me = this;
      // register events handler
      this.on(document, "brushesReady", this.onBrushesReady);

      // publishing which brush has been clicked
      this.$node.delegate("select", "change", function(){
        me.trigger(document, "uiBrushClicked", {
          brushId: $(this).val()
        });
      });

      this.trigger(document, "brushesRequested");
    });

    this.onBrushesReady = function(e, eObj){
      this.drawBrushesList(eObj);
    };

    this.drawBrushesList = function(eObj){
      var widget = mustache.render(tmpl, eObj.brushes);

      this.$node.append(widget);
      this.attr.widgetEl = this.$node.children("select").first().attr("id");
    };
  }
});
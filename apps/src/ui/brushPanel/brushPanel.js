define(function(require){

  var defineComponent = require("flight/lib/component"),
      tmpl = require("text!./template.html"),
      mustache = require("mustache");

  return defineComponent(brushPanel);

  function brushPanel() {

    this.defaultAttrs({
      widgetEl: "#brushpanel-widget",
      brushItem: ".brush-box-item"
    });

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function() {
      this.on(document, "brushes-loaded", function(e, data) {
        this.renderTemplate(data);
      }.bind(this));

      this.on("click", {
        brushItem: function(e, data) {
          this.brushSelected($(data.el).data("brushId"));
        }
      });
    };

    this.brushSelected = function(id) {
      this.trigger(document, "activeBrush-changed", {
        activeBrushId: id
      });
    };

    this.renderTemplate = function(data) {
      if (data.brushes) {
        this.$node.empty();
        this.$node.append(mustache.render(tmpl, data));  
      }
    };

  }

});
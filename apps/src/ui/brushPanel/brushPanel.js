define(function(require){

  var defineComponent = require("flight/lib/component"),
      tmpl = require("text!./template.html"),
      mustache = require("mustache");

  return defineComponent(brushPanel);

  function brushPanel() {

    this.defaultAttrs({
      widgetEl: "brushpanel-widget"
    });

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function() {
      this.on(document, "brushes-loaded", function(e, data) {
        this.renderTemplate(data);
      }.bind(this));
    };

    this.renderTemplate = function(data) {
      if (data.brushes) {
        this.$node.empty();
        this.$node.append(mustache.render(tmpl, data));  
      }
    };

  }

});
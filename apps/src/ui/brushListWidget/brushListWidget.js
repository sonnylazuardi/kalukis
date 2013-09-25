/**
 * I'am responsible for rendering the brushes list widget
 */
define(function(require){
  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/brushListWidget/template.html");

  return defineComponent(brushListWidget);

  function brushListWidget(){

    this.after("initialize", function(){
      this.attachEventListeners();
      this.renderTemplate({brushes:[{id:'',name:''}]});
    });

    this.attachEventListeners = function(){
      this.on("change", this.brushSelected);
      this.on(document, "brushesLoaded", this.setBrushList);
    };

    this.renderTemplate = function(data){
      if (data.brushes){
        var widget = mustache.render(tmpl, data);

        if (this.$node.children().length) {
          this.$node.children().replaceWith(widget);
        } else {
          this.$node.append(widget);
        }
      }
    };

    this.setBrushList = function(e, data){
      if (data.brushes) {
        this.renderTemplate(data);
      }
    };

    this.brushSelected = function(e, data){
      var selectedBrush = $('#' + e.target.id).val();

      this.trigger(document, "activeBrushChanged", {
        activeBrushId: selectedBrush
      });
    };

  }
});
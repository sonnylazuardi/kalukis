/**
 * This module is responsible for rendering paint widget list on
 * the template
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!ui/paintWidget/template.html");

  return defineComponent(paintWidgets);

  function paintWidgets(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    /**
     * Listen to events
     */
    this.attachEventListeners = function(){
      this.on("click", this.publishClickedPaintWidget);

      this.on(document, "paintWidgetsLoaded", this.renderTemplate);
    };

    /**
     * We need to publish paint widget clicked event
     */
    this.publishClickedPaintWidget = function(e){
      if (e.target.id) {
        this.trigger(document, "paintWidgetClicked", {
          paintWidgetId: e.target.id
        });
      }
    };

    /**
     * Render the list of widgets
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.renderTemplate = function(e, data){
      var widgetList = mustache.render(tmpl, data);
      if (this.$node.children().length) {
        this.$node.children().replaceWith(widgetList)
      } else {
        this.$node.append(widgetList);
      }
    };
    
  }

});
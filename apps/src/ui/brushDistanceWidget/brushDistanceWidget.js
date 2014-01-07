/**
 * I'am responsible to handle user event on changing the
 * brush distance
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      mustache = require("mustache"),
      tmpl = require("text!./template.html");

  return defineComponent(brushDistanceWidget);

  function brushDistanceWidget(){

    this.defaultAttrs({
      width: 0,
      brushDistanceWidgetEl: "#brushdistance-widget",
      brushDistanceInfoEl: ".brushdistance-info"
    });

    this.after("initialize", function(){
      this.renderWidget({value: this.attr.width});
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("change", {
        brushDistanceWidgetEl: this.brushDistanceChanged
      });
    };

    this.renderWidget = function(data){
      var widget = mustache.render(tmpl, data);

      if (this.$node.children().length) {
        this.$node.children().replaceWith(widget);
      } else {
        this.$node.append(widget);
      }
    };

    this.brushDistanceChanged = function(e, data){
      var distance = parseInt(e.target.value, 10);

      this.select("brushDistanceInfoEl").html(distance);
      this.trigger(document, "change-brushProperty", {
        distance: distance
      });
    };

  }

});
define(["require","flight/lib/component","mustache","text!ui/brushSizeWidget/template.html"],function(t){function e(){this.defaultAttrs({width:10,brushSizeWidgetEl:"#brushsize-widget",brushSizeInfoEl:".brushsize-info"}),this.after("initialize",function(){this.renderWidget({value:this.attr.width}),this.attachEventListeners()}),this.attachEventListeners=function(){this.on("change",{brushSizeWidgetEl:this.brushSizeChanged})},this.renderWidget=function(t){var e=n.render(r,t);this.$node.children().length?this.$node.children().replaceWith(e):this.$node.append(e)},this.brushSizeChanged=function(t){var e=parseInt(t.target.value,10);this.select("brushSizeInfoEl").html(e),this.trigger(document,"brushProperty-changed",{width:e})}}var i=t("flight/lib/component"),n=t("mustache"),r=t("text!ui/brushSizeWidget/template.html");return i(e)});
define(["require","flight/lib/component","text!data/brushes.json"],function(t){function e(){this.defaultAttrs({brushes:[]}),this.after("initialize",function(){this.attachBrushes()}),this.attachBrushes=function(){this.attr.brushes=JSON.parse(r),this.trigger("brushes-loaded",{brushes:this.attr.brushes})}}var i=t("flight/lib/component"),r=t("text!data/brushes.json");return i(e)});
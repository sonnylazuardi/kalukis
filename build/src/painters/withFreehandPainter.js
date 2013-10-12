define(["require","fabric","extBrushes/fabric.BrushDistance"],function(t){function e(){this.defaultAttrs({mixinCanvas:void 0,activeBrush:void 0}),this.after("initialize",function(){this.on("brush-served",function(t,e){this.setBrush(e.brush)}.bind(this)),this.on("brushProperty-updated",function(t,e){"width"===e.key?this.setBrushWidth(e.newValue):"fillColor"===e.key||"strokeColor"===e.key?this.setBrushColor(e.newValue):"distance"===e.key&&this.setBrushDistance(e.newValue)}.bind(this))}),this.startFreehandPainting=function(t,e){var i=e||this.attr.activeBrush;i&&(this.attr.mixinCanvas=t,this.attr.mixinCanvas.isDrawingMode=!0,this.setupFreehandPaintingProperty(i))},this.stopFreehandPainting=function(){this.attr.mixinCanvas&&(this.attr.mixinCanvas.isDrawingMode=!1)},this.setBrush=function(t){this.attr.activeBrush=t,this.attr.mixinCanvas&&this.attr.mixinCanvas.isDrawingMode&&this.setupFreehandPaintingProperty(t)},this.setupFreehandPaintingProperty=function(t){var e=t.getBrush();e.color=t.get("fillColor"),e.width=t.get("width"),this.attr.mixinCanvas.freeDrawingBrush=e,i.hijack(e)},this.setBrushWidth=function(t){this.attr.activeBrush.set("width",t),this.attr.mixinCanvas&&this.attr.mixinCanvas.isDrawingMode&&(this.attr.mixinCanvas.freeDrawingBrush.width=t)},this.setBrushColor=function(t){this.attr.activeBrush.set("fillColor",t),this.attr.mixinCanvas&&this.attr.mixinCanvas.isDrawingMode&&(this.attr.mixinCanvas.freeDrawingBrush.color=t)},this.setBrushDistance=function(t){i.setDistance(t)}}var i=(t("fabric"),t("extBrushes/fabric.BrushDistance"));return e});
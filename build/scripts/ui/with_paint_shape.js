define(["require","flight/lib/compose","flight/lib/advice"],function(t){function e(){this.defaultAttrs({isPainting:!1,brush:{color:"#000000"},outlinePainter:void 0}),this.after("initialize",function(){this.on("click",this.onClick),this.on(document,"uiPaintButtonsClicked",this.onUiPaintButtonsClicked),this.on(document,"colorChanged",this.setBrushProperty),this.after("afterFinishCallback",this.afterAfterFinishCallback)}),this.onClick=function(){this.attr.isPainting=!0,this.trigger(document,"uiPaintButtonsClicked",{clicked:this.attr.type}),this.on(document,"selectedBrushReady",this.onSelectedBrushReady),this.attr.outlinePainter=this.getOutlinePainter(),i.mixin(this.attr.outlinePainter,[n.withAdvice]),this.attr.outlinePainter.after("finish",function(){this.afterFinishCallback()}.bind(this)),this.trigger(this.attr.canvasEl,"paintRequested",{painter:this.attr.outlinePainter}),this.trigger(document,"selectedBrushRequested")},this.afterAfterFinishCallback=function(){this.attr.isPainting=!1},this.onUiPaintButtonsClicked=function(t,e){e.clicked!==this.attr.type&&this.attr.isPainting&&this.trigger(this.attr.canvasEl,"paintStopRequested")},this.setBrushProperty=function(t,e){this.attr.brush[e.key]=e[e.key]},this.setBrush=function(t,e){this.attr.brushId=e.selectedId},this.onSelectedBrushReady=function(t,e){this.setBrush(t,e)}}var i=t("flight/lib/compose"),n=t("flight/lib/advice");return e});
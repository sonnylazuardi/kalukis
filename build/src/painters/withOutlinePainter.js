define(["require","flight/lib/compose","flight/lib/advice"],function(t){function e(){this.startOutlineShapePainting=function(t,e,r){var s={obj:e,onMouseDown:function(t){e.onMouseDown(t)},onMouseMove:function(t){e.onMouseMove(t)},onMouseUp:function(t){e.onMouseUp(t)}};e.hasOwnProperty("__hasBeenAddedAfterAdvice")||(i.mixin(e,[n.withAdvice]),e.after("finish",function(){this.finalizeOutlineShapePainting(e)}.bind(this)),e.__hasBeenAddedAfterAdvice=!0),r.unregisterExistingListeners(t),r.registerEventListeners(t,s),e.start()},this.finalizeOutlineShapePainting=function(t){this.trigger("outlineShape-painting-finished",{outlineShape:t})}}var i=t("flight/lib/compose"),n=t("flight/lib/advice");return e});
define(function( require ) {

  var fabric = require("fabric");

  return withPaintingDistance;

  function withPaintingDistance() {

    function getDistance( from, to ) {
      var dx = from.x - to.x,
          dy = from.y - to.y;

      return Math.sqrt(dx * dx + dy * dy);
    }

    this.before("registerEventListeners", function( canvas, listeners ) {
      this.attachDistance(listeners);
    }.bind(this));

    this.attachDistance = function( listeners ) {
      this.hijackOnMouseMove(listeners);
    };

    this.hijackOnMouseMove = function( listeners ) {
      var obj = listeners.obj;

      listeners.onMouseMove = function( e ) {
        var point = obj.canvas.getPointer(e.e);

        if (obj.isDrawing && getDistance(obj.startPoint, point) > 20) {
          return obj.updateOutline({x: point.x - 20, y: point.y - 20});
        }

        return this;
      };
    };

  }

});
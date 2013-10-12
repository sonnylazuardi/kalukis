define(function( require ) {

  var fabric = require("fabric"),
      brushDistanceUtil = require("paintingUtils/brushDistance");

  return withPaintingDistance;

  function withPaintingDistance() {

    function getDistance( from, to ) {
      var dx = from.x - to.x,
          dy = from.y - to.y;

      return Math.sqrt(dx * dx + dy * dy);
    }

    var distance = 0;

    this.before("registerEventListeners", function( canvas, listeners ) {
      this.attachDistance(listeners);
    }.bind(this));

    this.after("initialize", function() {
      this.on(document, "brushProperty-updated", function(e, data) {
        console.log(data);
        if (data.key === "distance") {
          distance = data.newValue;
          console.log(distance);
        }
      });
    });

    this.attachDistance = function( listeners ) {
      this.hijackOnMouseMove(listeners);
    };

    this.hijackOnMouseMove = function( listeners ) {
      var obj = listeners.obj;

      listeners.onMouseMove = function( e ) {
        var point = obj.canvas.getPointer(e.e);

        if (obj.isDrawing && getDistance(obj.outerPoint, point) > distance) {
          return obj.updateOutline(brushDistanceUtil.getClosestPoint(distance, obj.outerPoint, point));
        }

        return this;
      };
    };

  }

});
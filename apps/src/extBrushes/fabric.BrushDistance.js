define(function(require) {

  var fabric = require("fabric"),
      brushDistanceUtil = require("canvasUtils/brushDistance");

  var isFarEnough = brushDistanceUtil.isFarEnough,
      getClosestPoint = brushDistanceUtil.getClosestPoint;

  var _distance = 0;

  function _hijack(brush) {
    if (brush.hasBeenHijacked) {
      return brush;
    }

    var brushOnMouseMove = brush.onMouseMove;

    brush.onMouseMove = function(pointer) {
      var length = brush.points.length,
          lastPoint = brush.points[length - 1];

      if (isFarEnough(lastPoint, pointer, _distance)) {
        return brushOnMouseMove.call(brush, getClosestPoint(lastPoint, pointer, _distance));
      }
    };

    brush.hasBeenHijacked = true;

    return brush;
  }

  return {
    hijack: function(brush) {
      return _hijack(brush);
    },

    setDistance: function(distance) {
      _distance = distance;
    },

    getDistance: function() {
      return _distance;
    }
  };

});
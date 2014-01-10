define(function(require) {

  var fabric = require('fabric'),
      brushDistanceUtil = require('canvasUtils/brushDistance');

  var isFarEnough = brushDistanceUtil.isFarEnough,
      getClosestPoint = brushDistanceUtil.getClosestPoint;

  var _distance = 0;

  function _hijack(brush) {
    if (brush.hasBeenHijacked) {
      return brush;
    }

    var brushOnMouseMove = brush.onMouseMove,
        // TODO ugly
        points = brush.points ? brush.points : brush._points ?
          brush._points : brush.sprayChunks;

    brush.onMouseMove = function(pointer) {
      if (_distance <= 1) {
        // shortcut
        return brushOnMouseMove.call(brush, pointer);
      }

      var length = points.length,
          lastPoint = points[length - 1];
      console.log(lastPoint);
      if (isFarEnough(lastPoint, pointer, _distance)) {
        // TODO this causes problem for spray brush
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
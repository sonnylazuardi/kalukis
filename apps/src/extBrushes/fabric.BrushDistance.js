define(function( require ) {

  var fabric = require("fabric"),
      brushDistanceUtil = require("paintingUtils/brushDistance");

  var isFarEnough = brushDistanceUtil.isFarEnough,
      getClosestPoint = brushDistanceUtil.getClosestPoint;

  var _distance = 0;

  function _hijack( brush ) {
    if (brush.hasBeenHijack) {
      return brush;
    }

    var brushOnMouseMove = brush.onMouseMove;

    brush.onMouseMove = function( pointer ) {
      var length = this._points.length,
          lastPoint = this._points[length - 1];

      if (isFarEnough(lastPoint, pointer, _distance)) {
        return brushOnMouseMove.call(brush, getClosestPoint(lastPoint, pointer, _distance));
      }
    };

    brush.hasBeenHijack = true;
  }

  return {
    hijack: function( brush ) {
      return _hijack(brush);
    },

    setDistance: function( distance ) {
      _distance = distance;
    },

    getDistance: function() {
      return _distance;
    }
  };

});
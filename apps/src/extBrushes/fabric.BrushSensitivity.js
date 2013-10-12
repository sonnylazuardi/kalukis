define(function( require ) {

  var fabric = require("fabric"),
      brushSensitivity = require("canvasUtils/brushSensitivity");

  var _sensitivity = 1;

  function _hijack( brush ) {
    if (brush.isSensitive) {
      return brush;
    }

    var brushAddPoint = brush["addPoint"];

    brush["addPoint"] = function( point ) {      
      var length = brush.points.length,
          lastPoint = brush.points[length - 1];

      if (_sensitivity > 1 && lastPoint) {
        point = brushSensitivity.getNormalizedPoint(lastPoint, point, _sensitivity);
      }

      return brushAddPoint.call(brush, point);
    };

    return brush;
  }

  return {

    hijack: function( brush ) {
      return _hijack(brush);
    },

    setSensitivity: function( sensitivity ) {
      _sensitivity = sensitivity;
    },

    getSensitivity: function() {
      return _sensitivity;
    }

  };

});
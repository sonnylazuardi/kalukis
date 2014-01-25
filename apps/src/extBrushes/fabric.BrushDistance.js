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
        brushDrawDot = brush.drawDot,
        brushOnMouseUp = brush.onMouseUp,
        brushOnMouseDown = brush.onMouseDown,
        // TODO ugly
        points = brush.points ? brush.points : brush._points ?
          brush._points : brush.sprayChunks;
    brush.drawDot = function(pointer) {
      // if (issocket)
      return brushDrawDot.call(brush, pointer);
    }
    brush.onMouseUp = function(issocket) {
      if (!issocket)
        socket.emit('brushup');
      // if (issocket)
        return brushOnMouseUp.call(brush);
    }
    brush.onMouseDown = function(pointer, issocket) {
      if (!issocket)
        socket.emit('brushdown', pointer);
      // if (issocket)
        return brushOnMouseDown.call(brush, pointer);
    }
    brush.onMouseMove = function(pointer, issocket) {
      if (_distance <= 1) {
        // shortcut
        if (!issocket)
          socket.emit('brushmove', pointer);
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
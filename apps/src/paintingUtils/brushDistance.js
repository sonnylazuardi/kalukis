define(function( require ) {

  function getDistance( from, to ) {
    var dx = from.x - to.x,
        dy = from.y - to.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  return {

    isFarEnough: function( startPoint, outerPoint, mousePoint, distance ) {
      if (!startPoint || !outerPoint) {
        return false;
      }

      return getDistance(outerPoint, mousePoint) > distance;
    },

    getClosestPoint: function( startPoint, outerPoint, mousePoint, distance ) {
      if (distance <= 0) {
        return mousePoint;
      }

      var dX = mousePoint.x - startPoint.x,
          dY = mousePoint.y - startPoint.y,
          dH = Math.sqrt(dX * dX + dY * dY),
          expected = dH - distance,
          rH = expected / dH;

      return {
        x: rH * dX + startPoint.x,
        y: rH * dY + startPoint.y
      };
    }

  };

});
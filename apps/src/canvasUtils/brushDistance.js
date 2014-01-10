define(function(require) {

  function getDistance(from, to) {
    var dx = from.x - to.x,
        dy = from.y - to.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  return {

    isFarEnough: function(from, to, distance) {
      if (!from || !to) {
        return false;
      }

      return getDistance(from, to) > distance;
    },

    getClosestPoint: function(from, to, distance) {
      if (distance <= 0) {
        return to;
      }

      var dX = to.x - from.x,
          dY = to.y - from.y,
          dH = Math.sqrt(dX * dX + dY * dY),
          expected = dH - distance,
          ratio = expected / dH;

      return {
        x: ratio * dX + from.x,
        y: ratio * dY + from.y
      };
    }

  };

});
define(function( require ) {

  function getDistance( from, to ) {
    var dx = from.x - to.x,
        dy = from.y - to.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  return {

    getNormalizedPoint: function( from, to, sensitivity ) {
      if (!from || !to) {
        return;
      }
      
      if (sensitivity === 1) {
        return to;
      }

      if (getDistance(from, to) < sensitivity) {
        return from;
      } else {
        return to;
      }
    }

  }; 

});
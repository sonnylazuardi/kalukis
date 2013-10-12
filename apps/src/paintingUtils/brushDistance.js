define(function( require ) {

  var fabric = require("fabric");

  return {

    getClosestPoint: function( distance, outerPoint, mousePoint ) {
      if (distance <= 0) {
        return mousePoint;
      }

      return {
        x: mousePoint.x - distance,
        y: mousePoint.y - distance
      };
    }

  };

});
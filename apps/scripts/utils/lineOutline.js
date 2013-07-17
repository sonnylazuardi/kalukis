define(function(){
  function getSlope(p1, p2){
    return (p2.y - p1.y) / (p2.x - p1.x);
  }

  function getLineEquation(p1, p2){
    var slope = getSlope(p1, p2);

    return function(x){
      return p1.y + slope*(x - p1.x);
    };
  }

  return function(brush, x1, y1, x2, y2){
    var points = [],
        distance = Math.abs(x1 - x2),
        lineEquation = getLineEquation({x: x1, y: y1},{x: x2, y: y2}),
        xAng = x1 > x2 ? -1 : 1,
        bWidth = xAng * brush.width;

    for (var i = 0, x = x1; i <= distance; i += brush.width, x += bWidth){
      points.push({
        x: x,
        y: lineEquation(x)
      });
    }

    return points;
  };
});
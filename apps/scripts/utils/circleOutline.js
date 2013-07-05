define(function(){
  return function(brush, x, y, radius){
    var points = [],
        w = brush.width - 5;

    for (var i = 0; i < 360; i += w){
      if (i === 0) {
        points.push({x: x, y: y - radius});
      } else if (i === 90){
        points.push({x: x + radius, y: y});
      } else if (i === 180){
        points.push({x: x, y: y + radius});
      } else if (i === 270){
        points.push({x: x - radius, y: y});
      } else {
        points.push({
          x: Math.sin(i) * radius + x,
          y: Math.cos(i) * radius + y
        });
      }
    }

    return points;
  };
});
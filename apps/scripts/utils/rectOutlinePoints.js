define(function(){
  // TODO is there a better way, in term of performance,
  // to calculate this?
  return function(brush, x, y, width, height){
    var points = [],
        sbWidth = brush.width,
        wLength = x + width,
        hLength = y + height;
    // get top
    for (var i = x; i < wLength; i+= sbWidth){
      points.push({x: i, y: y});
    }

    // get left
    for (i = y; i < hLength; i += sbWidth){
      points.push({x: x, y: i});
    }

    // get bottom
    for (i = x; i < wLength; i += sbWidth){
      points.push({x: i, y: y + height});
    }

    // get right
    for (i = hLength; i >= y; i -= sbWidth){
      points.push({x: x + width, y: i});
    }

    return points;
  };
});
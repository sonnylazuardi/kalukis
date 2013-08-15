define(function(require){
  var fabric = require("fabric"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("mixins/with_outline_helper");

  var stainBrush = {

  };

  compose.mixin(stainBrush, [withOutlineHelper]);

  return stainBrush;
});
define(["require","fabric","paintingUtils/brushDistance"],function(t){function e(t){if(t.hasBeenHijack)return t;var e=t.onMouseMove;return t.onMouseMove=function(i){var o=t.points.length,a=t.points[o-1];return r(a,i,s)?e.call(t,n(a,i,s)):void 0},t.hasBeenHijack=!0,t}var i=(t("fabric"),t("paintingUtils/brushDistance")),r=i.isFarEnough,n=i.getClosestPoint,s=0;return{hijack:function(t){return e(t)},setDistance:function(t){s=t},getDistance:function(){return s}}});
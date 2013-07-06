define(function(require){
  var defineComponent = require("flight/component");

  return defineComponent(loadingIndicator);

  function loadingIndicator(){

    this.after("initialize", function(){
      this.on(document, "loadingIndicatorRequetsted", this.onLoadingIndicatorRequested);

      this.on(document, "hideLoadingIndicatorRequested", this.onHideLoadingIndicatorRequested);
    });

    this.onLoadingIndicatorRequested = function(){
      this.$node.css("display", "visible");
    };

    this.onHideLoadingIndicatorRequested = function(){
      this.$node.css("display", "none");
    };
  }
});
define(function(require){
  var defineComponent = require("flight/component");

  return defineComponent(loadingIndicator);

  function loadingIndicator(){

    this.after("initialize", function(){
      this.on(document, "loadingIndicatorRequested", this.onLoadingIndicatorRequested);

      this.on(document, "hideLoadingIndicatorRequested", this.onHideLoadingIndicatorRequested);
    });

    this.onLoadingIndicatorRequested = function(){
      this.$node.fadeIn();
    };

    this.onHideLoadingIndicatorRequested = function(){
      this.$node.fadeOut();
    };
  }
});
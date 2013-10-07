define(function(require) {

  var defineComponent = require("flight/lib/component");

  function statusInfo() {

    this.after("initialize", function(){
      this.attachEventListeners();
      this.renderTemplate();
    });

    this.attachEventListeners = function() {
      this.on("brushProperty-updated", function(e, data) {

      });
    };

    this.renderTemplate = function() {

    };

  }

});
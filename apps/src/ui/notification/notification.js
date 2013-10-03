define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(notification);

  function notification(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){

      this.on(document, "notify", function(e, data){
        if (data.type === "error") {
          this.alertError(data.options);
        } else if (data.type === "warning") {
          this.alertWarning(data.options);
        } else if (data.type === "info") {
          this.alertInfo(data.options);
        }
      }.bind(this));

    };

    /**
     * Display error alert
     * 
     * + message  : the message to display
     * + duration : the duration to show the message
     * + untilEvent    : display the alert until this event is triggered
     * 
     * @param  {Object} options The options
     */
    this.alertError = function(options) {
      this.$node.addClass("alert-error");
    };
    
    /**
     * Display warning alert
     * 
     * + message  : the message to display
     * + duration : the duration to show the message
     * + untilEvent    : display the alert until this event is triggered
     * 
     * @param  {Object} options The options
     */
    this.alertWarning = function(options) {
      this.$node.addClass("alert-warning");
    };

    /**
     * Display info alert
     * 
     * + message  : the message to display
     * + duration : the duration to show the message
     * + untilEvent    : display the alert until this event is triggered
     * 
     * @param  {Object} options The options
     */
    this.alertInfo = function(options) {
      this.$node.addClass("alert-info");
    };

  }

});
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(notification);

  function notification(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){

      this.on(document, "notify", function(e, data){
        var options = {
          message: data.message
        };

        if (data.type === "error") {
          this.alertError(options);
        } else if (data.type === "warning") {
          this.alertWarning(options);
        } else if (data.type === "info") {
          this.alertInfo(options);
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
      this.addAlertUi("error", options.message);
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
      this.addAlertUi("warning", options.message);
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
      this.addAlertUi("info", options.message);
    };

    this.addAlertUi = function(type, message) {
      this.$node.append("<div class='alert alert-" + type + "'>" + message + "</div>");
    };

  }

});
define(function(require){
  var Handlebars = require("handlebars");

  return function(){
    this.renderData = function(data, template){
      var compiledHtml = Handlebars.compile(template);

      return compiledHtml(data);
    };
  };
});
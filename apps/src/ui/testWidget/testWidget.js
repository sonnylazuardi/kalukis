define(function(require){

  var defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/testWidget/template.html');

  return defineComponent(TestWidget);

  function TestWidget() {

    this.defaultAttrs({
      testWidgetEl: '#testwidget'
    });

    this.after('initialize', function(){
      this.renderTemplate();
      this.attachEventListeners();
    });

    this.renderTemplate = function(){
      this.$node.append(tmpl);
    };

    this.attachEventListeners = function(){
      // this.on('click', function() {
      //   alert("testing");
      // });
    };

    this.initFreehandPainting = function(){
    };

  }

});
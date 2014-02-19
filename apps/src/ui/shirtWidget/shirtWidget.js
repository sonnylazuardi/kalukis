define(function(require){

  var defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/shirtWidget/template.html');

  return defineComponent(ShirtWidget);

  function ShirtWidget() {

    this.defaultAttrs({
      shirtWidgetEl: '#shirtwidget',
      hiddenShirtInputEl: '#shirtinput',
      counter: -1,
    });

    this.after('initialize', function(){
      this.renderTemplate();
      this.attachEventListeners();
    });

    this.renderTemplate = function(){
      this.$node.append(tmpl);
    };

    this.attachEventListeners = function(){
      this.on('click', {
        shirtWidgetEl: this.requestNewShirt,
      });
    };

    this.requestNewShirt = function(){
      this.attr.counter++;
      this.attr.counter %= 3;
      this.trigger(document, 'shirtWidget-clicked',{counter:this.attr.counter});
    };
  }

});
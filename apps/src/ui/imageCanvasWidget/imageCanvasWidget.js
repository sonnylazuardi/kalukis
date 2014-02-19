define(function(require){

  var defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/imageCanvasWidget/template.html');

  return defineComponent(imageCanvasWidget);

  function imageCanvasWidget() {

    this.defaultAttrs({
      imageCanvasWidgetEl: '#imagecanvaswidget',
      hiddenImageInputEl: '#imageinput'
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
        imageCanvasWidgetEl: this.requestImageAddition,
      });

      this.on('change', {
        hiddenImageInputEl: this.requestImage
      });
    };

    this.requestImageAddition = function(){
      this.select('hiddenImageInputEl').click();
    };

    this.requestImage = function(e){
      this.trigger(document, 'imageCanvas-clicked', {
        files: e.target.files
      });
      console.log(e.target.files);
    };

  }

});
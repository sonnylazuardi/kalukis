define(function(require){

  var FB = require('facebook'),
      defineComponent = require('flight/lib/component'),
      tmpl = require('text!ui/FBWidget/template.html');

  return defineComponent(FBWidget);

  function FBWidget() {

    this.defaultAttrs({
      FBWidgetEl: '#fbwidget'
    });

    this.after('initialize', function(){
      this.renderTemplate();
      this.attachEventListeners();
    });

    this.renderTemplate = function(){
      this.$node.append(tmpl);
    };

    this.attachEventListeners = function(){
      this.on('click', function() {
        alert("INI WIDGET FB")
      });
    };

    //Added by fawwaz from below from pupunzi

    this.dataURItoBlob = function(dataURI,mime) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER);
      dataURI = dataURI.substring(base64Index + BASE64_MARKER.length);
      var byteString = window.atob(dataURI);
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mime });
    }


    this.post_fb_multipart = function() {
       var encodedPng=imgD.substring(start, strLength);
       imgD = Base64Binary.decode(encodedPng);
       var boundary = '--ThisIsTheBoundary1234567890';
       var formData = '--' + boundary; formData += 'Content-Disposition: form-data; name="source"; filename="picMood_' + new Date().getTime();
       formData += 'Content-Type: ' + mimeType;
       for (var i = 0; i < imgD.length; ++i) formData += String.fromCharCode(imgD[ i ] & 0xff);
       formData += '--' + boundary; var xhr = new XMLHttpRequest();
       xhr.open('POST', 'https://graph.facebook.com/' + picMood.fb_album_id + '/photos?access_token=' + token + '&place=' + placeID + "&message=" + encodeURIComponent(msg), true);
       xhr.setRequestHeader("content-type", "multipart/form-data; boundary=" + boundary);
       xhr.sendAsBinary(formData);
    }



  }

});
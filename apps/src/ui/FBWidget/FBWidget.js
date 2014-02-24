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
      this.on('click', {
        FBWidgetEl: this.aksiFB,
      });
    };

    this.aksiFB = function() { 
       FB.init({
        appId      : '1466692173543778',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });
      alert("test");
      FB.getLoginStatus(function(response) {
          alert(response);
      });
      FB.login();

      FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
            var access = FB.getAuthResponse()['accessToken'];
            var uid;
            FB.api('/me',function(respon){
              uid= respon.id;
            });

            var canvas = document.getElementById('lukis');
            var context = canvas.getContext('2d');
            var datauri = canvas.toDataURL('image/png');

            share(access,uid,datauri);

        } else if (response.status === 'not_authorized') {
          MasukFb();
        } else {
          MasukFb();
        }
      });
    };

    //Added by fawwaz from below from pupunzi

    function MasukFb(){
      FB.login(function(response){
        if(response.authResponse){
          var access = FB.getAuthResponse()['accessToken'];
          var uid;
          FB.api('/me',function(respon){
            uid= respon.id;
          });

          var canvas = document.getElementById('lukis');
          var context = canvas.getContext('2d');
          var datauri = canvas.toDataURL('image/png');

          share(access,uid,datauri);

        }else{
          console.log("Usec canceled login")
        }
      },{scope:publish_actions});
    }

    function share(access_token,uid,imageData){
      try {
          blob = dataURItoBlob(imageData);
      } catch (e) {
          console.log(e);
      }
      var fd = new FormData();
      fd.append("access_token", access_token);
      fd.append("source", blob);
      fd.append("message", "Photo Text");
      try {
          $.ajax({
              url: "https://graph.facebook.com/me/photos?access_token=" + access_token,
              type: "POST",
              data: fd,
              processData: false,
              contentType: false,
              cache: false,
              success: function (data) {
                  console.log("success " + data);
                  $("#poster").html("Posted Canvas Successfully");
              },
              error: function (shr, status, data) {
                  console.log("error " + data + " Status " + shr.status);
              },
              complete: function () {
                  console.log("Posted to facebook");
              }
          });

      } catch (e) {
          console.log(e);
      }
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {
            type: 'image/png'
        });
    }

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
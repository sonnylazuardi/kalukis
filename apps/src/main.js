require.config({
  baseUrl: 'src',

  paths: {
    fabric: '../libs/fabric.1.4.0',
    jquery: '../../vendor/jquery/jquery',
    text: '../../vendor/requirejs-text/text',
    mustache: '../../vendor/mustache/mustache',
    spectrum: '../../vendor/spectrum/spectrum',
    'es5-shim': '../../vendor/es5-shim/es5-shim',
    'es5-sham': '../../vendor/es5-shim/es5-sham',
    socketio: '../../vendor/socket.io/socket.io'
  },

  shim:{
    fabric: {
      exports: 'fabric'
    },
    jquery: {
      exports: '$'
    },
    'socketio': {
      exports: 'io'
    },
    spectrum: ['jquery'],
    app: {
      deps: ['es5-shim','es5-sham','jquery', 'spectrum']
    }
  },

  map: {
    '*': {
      'flight': '../../vendor/flight'
    }
  }
});

var socket;
function sendAction(data) {
  socket.emit('action', data);
}

require(

[
  'app',
  'socketio'
],

function(Application, io){
  // kickstart the application
  socket = io.connect('http://sonnylazuardi.kd.io:8001/');
  var app = new Application(socket);
  app.start();
});
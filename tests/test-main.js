var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/apps/src',

    paths: {
      fabric: 'canvas-lib/fabric',
      text: '../../vendor/requirejs-text/text',
      mustache: '../../vendor/mustache/mustache'
    },

    shim: {
      fabric: {
        exports: "fabric"
      }
    },

    map: {
      '*': {
        'flight': '../../vendor/flight'
      }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
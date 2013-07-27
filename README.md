# Lukis

Lukis is an experimental Painting Apps. Lukis is built on top of [flight](http://twitter.github.io/flight/) and [fabricjs](fabricjs.com).

This application uses event-driven approach. This means that we are trying to decouple each components by making sure that they do not communicate directly. Instead, they should communicate thgroug events.

The above approach is possible by using [flight](http://twitter.github.io/flight/).

For the canvas library, we use fabric.

## WARNING

We have found out that the painting performance is bad for some brush (eg, the spray brush). We are currently investigating how to increase the painting performance.

## Trying it

If you want to try this locally, please have [node](http://nodejs.org/) installed first. You also need to have bower installed:

> npm install -g bower

To install all of the dependancies, please run:

> bower install

I think that's about it. To try the application, just open `apps/index.html`.

## Running the tests

<del>Run `tests/index.html` in your browser of choice. I'm currently checking out [phantomjs](http://phantomjs.org) in order to run the tests from console.</del>

I've decided to use `testem` in order to run my tests. Just install `testem` globally through `npm`:

> npm install -g testem

To run the test, just type the command below on your console:

> testem

**Testem** will run the test with PhantomJS. So, you actually need to have PhantomJS installed. Please see their [site](http://phantomjs.org) to know the steps.

## TODO

This application is still at it's early stage. So, ofcourse there are a lot of things to do.

- [ ] Better Module Naming
- [ ] Improve the architecture
- [x] Start Unit test
- [x] Use PhantomJS to run unit tests (with the help of testem)
- [ ] Widgets on demand (show and hide when needed)
- [ ] Performance
- [ ] Shapes
- [ ] More Brushes
- [ ] Canvas Manipulation
- [ ] Other crazy stuffs
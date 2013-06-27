# Lukis

Lukis is an experimental Painting Apps. Lukis is built on top of [flight](http://twitter.github.io/flight/) and [fabricjs](fabricjs.com).

This application uses event-driven approach. This means that we are trying to decouple each components by making sure that they do not communicate directly. Instead, they should communicate thgroug events.

The above approach is possible by using [flight](http://twitter.github.io/flight/).

For the canvas library, we use fabric.

## Trying it

If you want to try this locally, please have [node](http://nodejs.org/) installed first. You also need to have bower installed:

> npm install -g bower

To install all of the dependancies, please run:

> bower install

I think that's about it.

## TODO

This application is still at it's early stage. So, ofcourse there are a lot of things to do.

- Improve the architecture
- Tests
- Widgets on demand (show and hide when needed)
- Performance
- Brushes
- Canvas Manipulation
- Other crazy stuffs
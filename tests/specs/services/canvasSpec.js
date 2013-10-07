// define(function(require){

//   var fabric = require("fabric");

//   describeComponent("services/canvas", function(){

//     beforeEach(function(){
//       loadFixtures("canvas.html");
//       setupComponent({
//         id: "lukis"
//       });
//     });

//     describe("Initialize component", function(){

//       it("Should be able to initialize the canvas", function(){
//         expect(this.component.attr.canvas).toBeInstanceOf(fabric.Canvas);
//       });

//     });

//     describe("Component communication", function(){

//       it("Should publish the correct data on request-canvas event", function(){
//         var spiedEvent = spyOnEvent('.component-root', "canvas-served");

//         $('.component-root').trigger("request-canvas");

//         expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');
//         expect(spiedEvent.mostRecentCall.data.canvas).toBeInstanceOf(fabric.Canvas);
//         expect(spiedEvent.mostRecentCall.data.id).toEqual("lukis");
//       });

//     });

//   });

// });
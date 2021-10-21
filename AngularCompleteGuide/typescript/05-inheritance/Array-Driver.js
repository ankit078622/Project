"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var Shape_1 = require("./Shape");
var shape = new Shape_1.Shape(10, 20);
var circle = new Circle_1.Circle(10, 20, 3);
var rectangle = new Rectangle_1.Rectangle(10, 20, 10, 20);
//Declare an array of shape and it is initially empty
var theShapes = [];
//add the shapes to the array
theShapes.push(shape);
theShapes.push(circle);
theShapes.push(rectangle);
for (var _i = 0, theShapes_1 = theShapes; _i < theShapes_1.length; _i++) {
    var tempShape = theShapes_1[_i];
    console.log(tempShape.getInfo());
}

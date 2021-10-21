
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';
let shape=new Shape(10,20);
console.log(shape.getInfo());

let circle=new Circle(10,20,3);
console.log(circle.getInfo());

let rectangle=new Rectangle(10,20,10,20);
console.log(rectangle.getInfo());
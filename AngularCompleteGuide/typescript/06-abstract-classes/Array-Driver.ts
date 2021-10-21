
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';

let circle=new Circle(10,20,3);
let rectangle=new Rectangle(10,20,10,20);

//Declare an array of shape and it is initially empty
let theShapes: Shape[]=[];

//add the shapes to the array
theShapes.push(circle);
theShapes.push(rectangle);

for(let tempShape of theShapes){
    console.log(tempShape.getInfo());
    console.log(tempShape.calculateArea());
    console.log();
}

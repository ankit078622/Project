import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems:CartItem[]=[];

  totalPrice: Subject<number>=new Subject<number>();
  totalQuantitity: Subject<number>=new Subject<number>();
  
  constructor() { }

  addToCart(theCartItem: CartItem){
    //check if we already have the item in our cart
    let alreadyExixtingInCart:boolean=false;
    let existingCartItem: CartItem=undefined;

    if(this.cartItems.length>0){

    //find the item in the cart based  on item id
     for(let tempCartItem of this.cartItems){
       if(tempCartItem.id===theCartItem.id){
         existingCartItem=tempCartItem;
         break;
       }
    //existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);
     }
    // check if we forund it
    alreadyExixtingInCart=(existingCartItem!=undefined);
    }
    if(alreadyExixtingInCart){
      //increment the quantity
      existingCartItem.quantity++;
    }
    else{
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals(){
    let totalPriceValue:number=0;
    let totalQuantitityValue:number=0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantitityValue+=currentCartItem.quantity;
    }
    //publish the new values ...all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantitity.next(totalQuantitityValue);

    //log acrt data just for debugging purposes
    this.logCartData(totalPriceValue,totalQuantitityValue);
  }
  logCartData(totalPriceValue: number, totalQuantitityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name} , quantity=${tempCartItem.quantity} , unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice:${totalPriceValue.toFixed(2)} , totalQuantity:${totalQuantitityValue}`);
    console.log('---');
  }

  decrementQuantity(theCartItem: CartItem) {
   theCartItem.quantity--;
   if(theCartItem.quantity===0){
     this.remove(theCartItem);
   }
   else{
     this.computeCartTotals();
   }
  }
  remove(theCartItem: CartItem) {
    //get index of item in the array
    const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id);

    //if found, remove the item from the array at the given index
    if(itemIndex){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}

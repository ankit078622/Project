class Customer{
   
    
    constructor( private _firstName:string,
        private _lastName: string){
       }

    //Getters and setters
    public get firstName():string{
        return this._firstName;
    }

    public set firstName(value:string){
        this._firstName=value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
}
//let's create an instance
let myCustomer=new Customer("Ankit","Jaisawal");

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
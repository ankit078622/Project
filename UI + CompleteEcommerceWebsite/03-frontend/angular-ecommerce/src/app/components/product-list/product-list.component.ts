import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
 // templateUrl: './product-list.component.html',
// templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[]=[];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  currentCategoryName: string; 
  searchMode:boolean=false;

  //new properties for pagination
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

  priviousKewword:string=null;
  

  constructor(private productService:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
       this.listProducts();
    });
  }
  
  listProducts(){
  this.searchMode=this.route.snapshot.paramMap.has('keyword');
   if(this.searchMode){
     this.handleSearchProduts();
   } 
   else{
     this.handleListProducts();
   }
    
  }
  handleSearchProduts(){
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword');

    //if we have a different keyword than previous
    //then set thePageNumber to 1
    if(this.priviousKewword!=theKeyword){
      this.thePageNumber=1;
    }

    this.priviousKewword=theKeyword;
    console.log(`Keyword=${theKeyword} , thePageNumber=${this.thePageNumber}`);

    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
    // this.productService.searchProducts(theKeyword).subscribe(
    //   data=>{
    //     this.products=data;
    //   }
    // ) 
  }



  handleListProducts(){
    //check if "id" parameter is available
    const hasCategoryId: boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      // get the "id" param string . convert string to a number using the "+" symbol
      this.currentCategoryId =+this.route.snapshot.paramMap.get('id');

      //get the name param strong of the categoryName
      this.currentCategoryName=this.route.snapshot.paramMap.get('name');
    }
    else{
      //not category id available... default to category id 1
      this.currentCategoryId=1;
      this.currentCategoryName='Books';
    }

    //
    //check if we have a different category than privious
    //Note: Angular will reuse a component if it is currently being viewed
    //

    //if we have a different category id than previous
    //then set thePageNumber back to 1
    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }    
    
    this.previousCategoryId=this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)
    //now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());


    //now get the products for the given category id
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data=>{
    //     this.products=data;

    //   }
    // )
  }
  processResult(){
     return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; })=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }

  //For page number for the pagination  
  value1:number;
  handleInput(event: Event) {
  this.value1 = + (event.target as HTMLOptionElement).value;
    this.updatePageSize(this.value1);
 }
  updatePageSize(pageSize:number){
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }
 

}


































 // listProducts(){
  //   this.productService.getProductList().subscribe(
  //     data=>{
  //       this.products=data;
  //     }
  //   )
  // }
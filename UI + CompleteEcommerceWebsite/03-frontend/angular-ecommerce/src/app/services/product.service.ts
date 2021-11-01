import { ProductCategory } from './../common/product-category';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // private baseUrl="http://localhost:8080/api/products?size=100";
  private baseUrl="http://localhost:8080/api/products";
  private categoryUrl=`http://localhost:8080/api/product-category`;

  constructor(private httpClient:HttpClient) { }

  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         theCategoryId:number): Observable<GetResponseProducts>{
                           
    // need to build url based on category id , page and size
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //For master view of the product
  getProduct(theProductId: number):Observable<Product> {
    //need to build URL based on product id
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
   

  getProductList(theCategoryId:number): Observable<Product[]>{

    //@TODO : need to build url based on category id .. will come back to this
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  //For search by category
  getProductCategories():Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory)
    );
  }

  
  // For search the particular product by search bar
  searchProducts(theKeyword: string):Observable<Product[]> {
     // need to build url based on the kewword
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage:number,
                        thePageSize:number,
                        theKeyword:string): Observable<GetResponseProducts>{
                          
  // need to build url based on category id , page and size
  const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                  +`&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  
}


interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number:number
  }
}

interface GetResponseProductsCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}




 // getProductList(): Observable<Product[]>{
  //   return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
  //     map(response => response._embedded.products)
  //   );
  // }

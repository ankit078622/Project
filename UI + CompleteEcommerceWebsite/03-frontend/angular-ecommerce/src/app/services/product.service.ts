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
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  
}


interface GetResponseProducts{
  _embedded: {
    products: Product[];
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

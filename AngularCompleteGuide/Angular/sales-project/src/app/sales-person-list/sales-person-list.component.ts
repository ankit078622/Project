import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  //create an array of objects
  salesPersonList: SalesPerson[]=[
    new SalesPerson("Ankit","Jaisawal","ak@gmail.com",500000),
    new SalesPerson("Rajan","Jaisawal","rk@gmail.com",500000),
    new SalesPerson("Irshad","Jaisawal","ik@gmail.com",500000),
    new SalesPerson("Amit","Jaisawal","akm@gmail.com",500000),
    new SalesPerson("Rahul","Jaisawal","ak@gmail.com",500000)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

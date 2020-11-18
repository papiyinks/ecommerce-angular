import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public latestProducts: any = [];

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.getLatestProducts();
  }

  getLatestProducts() {
    this.prodService.getProducts().subscribe(
      productData => {
      for (const key in productData) {
        this.latestProducts.push({...productData[key], id: key });
      }
    },
  );
  }

}

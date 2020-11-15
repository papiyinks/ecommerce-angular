import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Store } from '@ngrx/store';

import * as cartActions from './cart/store/cart.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any = [];

  constructor(private prodService: ProductsService, private store: Store) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.prodService.getProducts().subscribe(
        productData => {
        for (const key in productData) {
          this.products.push({...productData[key], id: key });
        }
      }
    );
  }

  addProductToCart(dispacthedProduct){
    this.store.dispatch(new cartActions.AddToCart(dispacthedProduct));
  }

}

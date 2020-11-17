import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as cartActions from './cart/store/cart.action';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any = [];
  isAuthenticated = false;
  public userSub: Subscription;

  constructor(private prodService: ProductsService, private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
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
    alert('Item has been added to Cart');
  }

}

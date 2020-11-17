import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as cartActions from './store/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartTotal: any = this.store.select(store => store.cartList.total);
  products: Observable<Array<any>>;
  total: any;
  noItemInCart = false;

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.products = this.store.select(store => store.cartList.addedItems);
    this.cartTotal.subscribe(currentTotal => {
      this.total = currentTotal;
    });
    if (this.total === 0) {
      this.noItemInCart = true;
    }
  }

  onAdd(cartProductID){
    this.store.dispatch(new cartActions.AddQuantity(cartProductID));
  }

  onSubtract(cartProductID){
    this.store.dispatch(new cartActions.SubtractQuantity(cartProductID));
  }

  onRemove(cartProductID){
    this.store.dispatch(new cartActions.RemoveItem(cartProductID));
    if (this.total === 0) {
      this.noItemInCart = true;
    }
  }
}

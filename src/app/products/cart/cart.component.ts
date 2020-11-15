import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

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

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.products = this.store.select(store => store.cartList.addedItems);
    this.cartTotal.subscribe(currentTotal => {
      this.total = currentTotal;
    });
  }

  onAdd(cartProductID){
    this.store.dispatch(new cartActions.AddQuantity(cartProductID));
  }

  onSubtract(cartProductID){
    this.store.dispatch(new cartActions.SubtractQuantity(cartProductID));
  }

  onRemove(cartProductID){
    this.store.dispatch(new cartActions.RemoveItem(cartProductID));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as cartActions from '../cart/store/cart.action';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public cartTotal: any = this.store.select(store => store.cartList.total);
  products: Observable<Array<any>>;
  total: any;

  constructor(private store: Store<any>, private router: Router,) {
  }

  ngOnInit(): void {
    this.products = this.store.select(store => store.cartList.addedItems);
    this.cartTotal.subscribe(currentTotal => {
      this.total = currentTotal;
    });
  }

  onClearCart() {
    this.store.dispatch(new cartActions.ClearCart());
    this.router.navigate(['/order']);
  }
}

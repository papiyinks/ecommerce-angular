import { ActionReducerMap } from '@ngrx/store';

import * as fromCart from '../products/cart/store/cart.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  cartList: fromCart.State;
  authList: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  cartList: fromCart.cartReducer,
  authList: fromAuth.authReducer
};

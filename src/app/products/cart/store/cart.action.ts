import { Action } from '@ngrx/store';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
  constructor(public data: {id: string; quantity: number; price: number}){}
}

export class RemoveItem implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public id: string){}
}

export class AddQuantity implements Action {
  readonly type = ADD_QUANTITY;
  constructor(public id: string){}
}

export class SubtractQuantity implements Action {
  readonly type = SUB_QUANTITY;
  constructor(public id: string){}
}

export class ClearCart implements Action {
  readonly type = CLEAR_CART;
}

export type CartActions =
| AddToCart
| RemoveItem
| AddQuantity
| SubtractQuantity
| ClearCart;

import {
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART
} from './cart.action';

export interface State {
  addedItems: Array<any>;
  total: number;
}

const initialState: State = {
  addedItems: [],
  total: 0,
};

export function cartReducer(
  state = initialState,
  action: {
    type: string;
    data: { id: string; quantity: number; price: number };
    id: string;
  }
): State {
  switch (action.type) {
    case ADD_TO_CART:
      const existedItem = state.addedItems.find(
        (item: { id: string }) => action.data.id === item.id
      );
      if (existedItem) {
        // action.data.quantity += 1;
        existedItem.quantity ++;
        return {
          ...state,
          total: state.total + action.data.price,
        };
      } else {
        // const item = {...action.data, quantity: 1 };
        action.data.quantity = 1;
        //calculating the total
        const newTotal = state.total + action.data.price;

        return {
          ...state,
          addedItems: [...state.addedItems, action.data],
          total: newTotal,
        };
      }
    case ADD_QUANTITY:
      const addedItem = state.addedItems.find(
        (item: { id: string }) => item.id === action.id
      );

      addedItem.quantity += 1;
      const newSum = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems],
        total: newSum,
      };
    case REMOVE_ITEM:
      const itemToRemove = state.addedItems.find(
        (item: { id: string }) => action.id === item.id
      );
      const new_items = state.addedItems.filter(
        (item: { id: string }) => action.id !== item.id
      );

      //calculating the total
      const newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    case SUB_QUANTITY:
      let addedProduct = state.addedItems.find(
        (item: { id: string }) => item.id === action.id
      );
      //if the qt == 0 then it should be removed
      if (addedProduct.quantity === 1) {
        let new_items = state.addedItems.filter(
          (item: { id: string }) => item.id !== action.id
        );
        let newTotal = state.total - addedProduct.price;
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
        };
      } else {
        addedProduct.quantity -= 1;
        let newTotal = state.total - addedProduct.price;
        return {
          ...state,
          addedItems: [...state.addedItems],
          total: newTotal,
        };
      }
    case CLEAR_CART:
      return initialState;
  }
  return state;
};

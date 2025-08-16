const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (ItemIndex >= 0) {
        // Create a copy of the cart item to avoid state mutation
        let updatedCart = [...state.carts];
        updatedCart[ItemIndex] = {
          ...updatedCart[ItemIndex],
          qnty: updatedCart[ItemIndex].qnty + 1,
        };
        return {
          ...state,
          carts: updatedCart,
        };
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }

    case "RMV_CART":
      const data = state.carts.filter((el) => el.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    case "RMV_ONE":
      const ItemIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (ItemIndex_dec >= 0 && state.carts[ItemIndex_dec].qnty > 1) {
        // Create a copy of the cart item and decrease quantity immutably
        let updatedCart = [...state.carts];
        updatedCart[ItemIndex_dec] = {
          ...updatedCart[ItemIndex_dec],
          qnty: updatedCart[ItemIndex_dec].qnty - 1,
        };
        return {
          ...state,
          carts: updatedCart,
        };
      } else if (state.carts[ItemIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload);
        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};


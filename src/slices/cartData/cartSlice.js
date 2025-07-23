import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.cartCount += 1;
      const existingProduct = state.cartItems.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.productSize === action.payload.productSize // Considering both size and ID
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    decrement: (state, action) => {
      state.cartCount -= 1;
      const existingProduct = state.cartItems.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.productSize === action.payload.productSize
      );

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.productSize === action.payload.productSize
            )
        );
      }
    },
    removeFromCart: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.productSize === action.payload.productSize
      );

      if (existingProduct) {
        // Subtract the quantity of the product from cartCount
        state.cartCount -= existingProduct.quantity;

        // Remove the product from cartItems
        state.cartItems = state.cartItems.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.productSize === action.payload.productSize
            )
        );
      }
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.cartCount = action.payload.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartCount = 0;
    }
  },
});

export const { increment, decrement, removeFromCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
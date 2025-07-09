import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productItems: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.productItems = action.payload;
    },
    removeItem: (state, action) => {
      state.productItems.splice(action.payload, 1)
    }
  },
});

export const { addProduct, removeItem } = productSlice.actions;
export default productSlice.reducer;

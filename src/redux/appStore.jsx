import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice.jsx";
import userReducer from "./userSlice.jsx";

const appStore = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    }
})

export default appStore;
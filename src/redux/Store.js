import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartSlice from "./slices/CartSlice";
import CategorySlice from "./slices/CategorySlice";
import SearchSlice from "./slices/SearchSlice";

const persistConfig = {
  key: "appData",
  storage: storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    cart: CartSlice,
    category: CategorySlice,
    search: SearchSlice,
  })
);

const Store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(Store);

export { Store, persistor };

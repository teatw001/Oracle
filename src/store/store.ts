import { configureStore } from "@reduxjs/toolkit";
import usersAPI, { AccountReducer } from "../service/Account.service";
import nhanViensAPI from "../service/nhanvien.service";
import theATMsAPI from "../service/theatm.service";

export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
    [nhanViensAPI.reducerPath]: nhanViensAPI.reducer,
    [theATMsAPI.reducerPath]: theATMsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersAPI.middleware,
      nhanViensAPI.middleware,
      theATMsAPI.middleware
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

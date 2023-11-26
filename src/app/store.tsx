/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, Store, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import thunkMiddleware from 'redux-thunk';
import registerSlice from '../features/register/registerSlice';
import addressSlice from '../features/address/addressSlice';
import cartSlice from '../features/cart/cartSlice';
import finishOrderSlice from '../features/finishOrder/finishOrderSlice';

export type RootState = ReturnType<any>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export const store: AppStore = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    address: addressSlice,
    cart: cartSlice,
    finishOrder: finishOrderSlice
  },
  middleware: [thunkMiddleware],
});

export type AppState = typeof store.getState;

export type AppDispatch = typeof store.dispatch;

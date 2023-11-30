import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AddressSlice {
  refresh: boolean;
}

const initialState: AddressSlice = {
  refresh: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState: initialState,
  reducers: {
    setRefresh: (state, action: PayloadAction<{ refresh: boolean }>) => {
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setRefresh } = addressSlice.actions;

export default addressSlice.reducer;

export const selectCurrentRefresh = (state: AddressSlice) => state.refresh;

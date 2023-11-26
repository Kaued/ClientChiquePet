import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface finishOrderSliceValue {
  item: {
    productId: number;
    qtd: number;
  }[];
  addressId: number;
  isOrder: boolean;
  step: number;
}

const initialValues: finishOrderSliceValue =
  localStorage.getItem("finishOrder") !== null
    ? JSON.parse(localStorage.getItem("finishOrder")!)
    : {
        item: [],
        addressId: 0,
        isOrder: false,
        step: 0,
      };

const finishOrderSlice = createSlice({
  initialState: initialValues,
  name: "finishOrder",
  reducers: {
    setAddressOrder: (state, action: PayloadAction<{ addressId: number }>) => {
      state.addressId = action.payload.addressId;
      localStorage.setItem("finishOrder", JSON.stringify(state));
    },

    setItemsOrder: (
      state,
      action: PayloadAction<{
        item: {
          productId: number;
          qtd: number;
        }[];
        isOrder: boolean;
      }>,
    ) => {
      state.item = action.payload.item;
      state.isOrder = action.payload.isOrder;
      localStorage.setItem("finishOrder", JSON.stringify(state));
    },

    setStepOrder: (state, action: PayloadAction<{ step: number }>) => {
      const step = action.payload.step;
      if (step >= 1) {
        state.step = state.addressId > 0 ? step : 0;
      } else if (step <= state.step) {
        state.step = step;
      }
      localStorage.setItem("finishOrder", JSON.stringify(state));
    },

    removeFinishOrder: (state) => {
      state = {
        item: [],
        addressId: 0,
        isOrder: false,
        step: 0,
      };
      localStorage.setItem("finishOrder", JSON.stringify(state));
    },
  },
});

export const { setAddressOrder, setItemsOrder, setStepOrder } =
  finishOrderSlice.actions;

export default finishOrderSlice.reducer;

export const selectCurrentItem = (state: finishOrderSliceValue) => state.item;
export const selectCurrentAddressId = (state: finishOrderSliceValue) =>
  state.addressId;
export const selectCurrentIsOrder = (state: finishOrderSliceValue) =>
  state.isOrder;
export const selectCurrentStep = (state: finishOrderSliceValue) => state.step;

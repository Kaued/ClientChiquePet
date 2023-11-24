import { createSlice } from "@reduxjs/toolkit";
import { Products } from "../../hooks/products/useGetProduct"

export interface finishOrderSliceValue{
  item:{
    product:Products,
    qtd: number,
  }[],
  addressId:number
  isOrder: boolean,
  step: number
}

const initialValues: finishOrderSliceValue = {
  item: [],
  addressId: 0,
  isOrder: false,
  step: 0
};

const finisihOrderSlice = createSlice({
  initialState: initialValues,
  name:"finishOrder",
  reducers:{
    // setAddressOrder: (state)
  }
});
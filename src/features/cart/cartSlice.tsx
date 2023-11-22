import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../hooks/products/useGetProduct";

export interface CartSlice {
  item:{
    product:Products;
    qtd: number;
  }[],
  isOrder: boolean
};

const initialState: CartSlice = {item:[], isOrder:false};

const cartSlice = createSlice({
  initialState: initialState,
  name: "cart",
  reducers:{
    addItemCart: (state, action: PayloadAction<{ product: Products; qtd: number }>)=>{
      if(action.payload.qtd>0){
        if(!state.item.find((a)=>a.product.productId == action.payload.product.productId)){ 
          state.item.push({product: action.payload.product, qtd: action.payload.qtd})
        }
      }
    },
    removeItemCart: (state, action: PayloadAction<{ index:number }>)=>{
      state.item.splice(action.payload.index, action.payload.index);
    },
    changeQtdProduct: (state, action: PayloadAction<{ index: number; qtd: number }>)=>{
      state.item[action.payload.index].qtd=action.payload.qtd;
    },
    setIsOrder:  (state, action: PayloadAction<{ order: boolean }>)=>{
      state.isOrder=action.payload.order;
    }

  }
});

export const { addItemCart, removeItemCart, changeQtdProduct, setIsOrder } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentItem = (state: CartSlice) => state.item;
export const selectCurrentIsOrder = (state: CartSlice) => state.isOrder;
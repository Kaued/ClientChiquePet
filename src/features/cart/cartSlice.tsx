import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Products } from "../../hooks/products/useGetProduct";

export interface CartSlice {
  item: {
    product: Products;
    qtd: number;
  }[],
  isOrder: boolean,
  openQuestion: boolean,
};

const initialState: CartSlice = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : { item: [], isOrder: false, openQuestion: false };

const cartSlice = createSlice({
  initialState: initialState,
  name: "cart",
  reducers: {
    addItemCart: (state, action: PayloadAction<{ product: Products; qtd: number }>) => {
      if (action.payload.qtd > 0) {
        if (!state.item.find((a) => a.product.productId == action.payload.product.productId)) {
          state.item.push({ product: action.payload.product, qtd: action.payload.qtd })

          state.openQuestion = action.payload.product.stock < action.payload.qtd;

          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    },
    removeItemCart: (state, action: PayloadAction<{ index: number }>) => {
      state.item.splice(action.payload.index, 1);
      let isOrder = false;
      state.item.forEach((oneItem) => {
        if (oneItem.product.stock >= oneItem.qtd && !isOrder) {
          state.isOrder = false
        } else {
          state.isOrder = true;
          isOrder = true
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },
    changeQtdProduct: (state, action: PayloadAction<{ index: number; qtd: number }>) => {
      if (action.payload.qtd > 0) {
        state.item[action.payload.index].qtd = action.payload.qtd;

        state.openQuestion = state.item[action.payload.index].product.stock < action.payload.qtd && !state.isOrder;

        let isOrder = false;
        state.item.forEach((oneItem) => {
          if (oneItem.product.stock >= oneItem.qtd && !isOrder) {
            state.isOrder = false;
          } else {
            state.isOrder = true;
            isOrder = true;
          }
        });
        localStorage.setItem("cart", JSON.stringify(state));
      }

    },
    setIsOrder: (state, action: PayloadAction<{ order: boolean }>) => {
      if (!action.payload.order) {
        state.item.forEach((oneItem, index) => {
          if (oneItem.product.stock < oneItem.qtd) {

            state.item[index].qtd = oneItem.product.stock;

            if (oneItem.product.stock <= 0) {
              state.item.slice(index, index);
            }

          }
        })
      }

      state.isOrder = action.payload.order;
      state.openQuestion = false;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeAllItems: (state) => {
      state.item = [];
      state.isOrder = false;
      localStorage.setItem("cart", JSON.stringify(state));
    }

  }
});

export const { addItemCart, removeItemCart, changeQtdProduct, setIsOrder, removeAllItems } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentItem = (state: CartSlice) => state.item;
export const selectCurrentIsOrder = (state: CartSlice) => state.isOrder;
export const selectCurrentOpenQuestion = (state: CartSlice) => state.openQuestion;
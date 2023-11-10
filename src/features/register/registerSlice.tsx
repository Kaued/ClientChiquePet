import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface RegisterSlice{
  userName: string,
  email: string,
  password: string,
  birthDate: Date | null,
  terms: boolean
}

const initialState : RegisterSlice ={
  userName:"",
  email:"",
  password:"",
  birthDate: null,
  terms: false
}

export const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  reducers:{
    setUserAndEmail: (state, action: PayloadAction<{email: string, userName: string}>)=>{
      state.email=  action.payload.email;
      state.userName= action.payload.userName;
    },
    setPassword: (state, action: PayloadAction<{password: string}>)=>{
      state.password=  action.payload.password;
    },
    setBirthAndTerms: (state, action: PayloadAction<{birthDate: Date, terms: boolean}>)=>{
      state.birthDate=  action.payload.birthDate;
      state.terms=  action.payload.terms;
    }
  }
})
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface RegisterSlice {
  fullName: string;
  email: string;
  password: string;
  birthDate: Date | string;
  terms: boolean;
  step: number;
  phoneNumber: string;
}

const initialState: RegisterSlice = {
  fullName: '',
  email: '',
  password: '',
  birthDate: '',
  terms: false,
  phoneNumber: '',
  step: 0,
};

const registerSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    setUserAndEmail: (state, action: PayloadAction<{ email: string; fullName: string }>) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
    },
    setPassword: (state, action: PayloadAction<{ password: string }>) => {
      state.password = action.payload.password;
    },
    setBirthAndTermsPhoneNumber: (
      state,
      action: PayloadAction<{
        birthDate: Date | string;
        terms: boolean;
        phoneNumber: string;
      }>,
    ) => {
      state.birthDate = action.payload.birthDate;
      state.terms = action.payload.terms;
      state.phoneNumber = action.payload.phoneNumber;
    },

    setStep: (state, action: PayloadAction<{ step: number }>) => {
      const step = action.payload.step;
      if (step >= 1) {
        state.step = state.fullName && state.email ? step : 0;
      } else if (step >= 2) {
        state.step = state.password ? step : 1;
      } else if (step <= state.step) {
        state.step = step;
      }
    },
  },
});

export const { setUserAndEmail, setBirthAndTermsPhoneNumber, setPassword, setStep } = registerSlice.actions;

export default registerSlice.reducer;

export const selectCurrentFullName = (state: RegisterSlice) => state.fullName;
export const selectCurrentEmail = (state: RegisterSlice) => state.email;
export const selectCurrentPassword = (state: RegisterSlice) => state.password;
export const selectCurrentBirthDate = (state: RegisterSlice) => state.birthDate;
export const selectCurrentTerms = (state: RegisterSlice) => state.terms;
export const selectCurrentStep = (state: RegisterSlice) => state.step;
export const selectCurrentPhoneNumber = (state: RegisterSlice) => state.phoneNumber;

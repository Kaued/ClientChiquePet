import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/axios';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthState } from '../../@types/AuthState';
import { QueryCache } from '@tanstack/react-query';

export interface AuthSlice {
  auth: {
    authenticated: boolean;
    expiration: Date;
    token: string;
    roles: string[];
    user: string;
    status: string;
    error: number;
    email: string;
  };
}

export const loginAsync = createAsyncThunk(
  'auth/loginAsyn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const request = api();

    return await request
      .post('/Client/login', JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response: AxiosResponse) => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        return response.data;
      })
      .catch((response: AxiosError) => {
        return rejectWithValue(response.response?.status);
      });
  },
);

const initialState = (): AuthState => {
  if (localStorage.getItem('user') !== null)
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + JSON.parse(localStorage.getItem('user') as string).token;

  return localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user') as string)
    : {
        authenticated: false,
        expiration: new Date(Date.now()),
        token: '',
        roles: [],
        user: '',
        status: '',
        error: 0,
        email: '',
      };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.expiration = new Date(Date.now());
      state.token = '';
      state.roles = [];
      state.user = '';
      state.status = '';
      state.error = 0;
      state.email = '';
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('user');
      const queryCache = new QueryCache();
      queryCache.clear();
      window.location.href = '/login';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'pedding';
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.authenticated = payload.authenticated;
        state.expiration = new Date(payload.expiration);
        state.token = payload.token;
        state.roles = payload.roles;
        state.email = payload.email;
        state.user = '';
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
        localStorage.setItem('user', JSON.stringify(state));
        window.location.href = '/';
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.status = 'fail';
        state.error = payload as number;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrenteAuthenticated = (state: AuthSlice) => state.auth.authenticated;
export const selectCurrenteExpiration = (state: AuthSlice) => state.auth.expiration;
export const selectCurrenteToken = (state: AuthSlice) => state.auth.token;
export const selectCurrenteRoles = (state: AuthSlice) => state.auth.roles;
export const selectCurrenteUser = (state: AuthSlice) => state.auth.user;
export const selectCurrenteStatus = (state: AuthSlice) => state.auth.status;
export const selectCurrenteError = (state: AuthSlice) => state.auth.error;

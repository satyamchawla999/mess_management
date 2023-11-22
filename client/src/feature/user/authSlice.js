import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    page: ""
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setPage: (state,action) => {
      state.page = action.payload.page
    }
  },
});

export const { login, logout, setPage } = authSlice.actions;
export default authSlice.reducer;

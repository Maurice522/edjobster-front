import { createSlice } from '@reduxjs/toolkit';
import initialState from './State';

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authAction: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { authAction } = authReducer.actions;

export default authReducer.reducer;

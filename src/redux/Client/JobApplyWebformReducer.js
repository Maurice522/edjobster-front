import { createSlice } from '@reduxjs/toolkit';

export const JobApplyWebFormReducer = createSlice({
  name: 'jobApplyWebForm',
  initialState: {},
  reducers: {
    setWebFormProperty: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setWebFormProperty } = JobApplyWebFormReducer.actions;

export default JobApplyWebFormReducer.reducer;

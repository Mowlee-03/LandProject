// snackbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  severity: 'info' // 'error', 'warning', 'info', 'success'
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      const { message, severity } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity || 'info';
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = '';
    }
  }
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../Store/slices/snackBarslice';


const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  const handleClose = () => dispatch(hideSnackbar());


  return (
    <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
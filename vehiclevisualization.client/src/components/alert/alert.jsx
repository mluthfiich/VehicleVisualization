import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';

const AlertComponent = ({ open, onClose, title, message, buttonComponent }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
          {buttonComponent}
      </DialogActions>
    </Dialog>
  );
};

export default AlertComponent;

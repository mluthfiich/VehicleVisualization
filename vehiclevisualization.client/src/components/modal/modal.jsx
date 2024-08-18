import React from "react";
import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalComponent = ({ open, handleClose, title, body, footer, textAlign }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
            {body}
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
            <Box textAlign>
                {footer}
            </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
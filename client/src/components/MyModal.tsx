import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { TModal } from "../types";

const MyModal = ({ isOpen, content, handleDialogClose }: TModal) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleDialogClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="Modal-Background">
        <Typography variant="h2" id="modal-title">
          Title Here
        </Typography>
      </Box>
    </Modal>
  );
};

export default MyModal;

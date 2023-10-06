import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { TSnackBar } from "../types";

const MySnackbar = ({
  isOpen,
  severity,
  message,
  handleSnackbarClose,
}: TSnackBar) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackbar;

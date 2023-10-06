export type TModal = {
  isOpen: boolean;
  content?: string;
  handleDialogClose?: () => void;
};

export type TSnackBar = {
  isOpen: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
  handleSnackbarClose?: () => void;
};

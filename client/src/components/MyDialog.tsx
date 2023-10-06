import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSnackbarContext } from "../context/SnackbarContext";
import { TModal } from "../types";
import { theme } from "../context/ThemeContext";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    pikayellow: true;
  }
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyDialog({
  isOpen,
  content,
  handleDialogClose,
}: TModal) {
  const { setSnackbarState } = useSnackbarContext();
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Tadah! All done!"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>
              {
                "Just copy the link below and share it with your friends! (To uh, play pranks or something)"
              }
            </Typography>

            <Grid container spacing={2} className={"UrlToCopy"}>
              <Grid item xs={6} sm={8}>
                <Typography
                  variant="subtitle1"
                  style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  {content ?? ""}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={4} className={"CopyButtonGrid"}>
                <Box
                  onClick={() => {
                    navigator.clipboard.writeText(content ?? "undefined");
                    setSnackbarState({
                      isOpen: true,
                      severity: "success",
                      message: "URL Copied!",
                    });
                  }}
                >
                  <ContentCopyIcon />
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{ color: (theme) => `${theme.palette.pikayellow.dark}` }}
          >
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

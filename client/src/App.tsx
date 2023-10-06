import React from "react";
import axios from "axios";
import "./App.css";
import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  MySnackbar,
  MyDialog,
} from "./components";
import { isValidUrl } from "./validation/isValidUrl";
import { useSnackbarContext } from "./context/SnackbarContext";
import Confetti from "react-confetti";
import BoltIcon from "@mui/icons-material/Bolt";
import { TModal } from "./types";

function App() {
  const [url, setUrl] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [modalState, setModalState] = React.useState<TModal>({
    isOpen: false,
  });

  const { snackbarState, setSnackbarState } = useSnackbarContext();
  const queryParams = new URLSearchParams(window.location.search);
  const error_flag = queryParams.get("error");

  React.useEffect(() => {
    if (error_flag === "404") {
      setSnackbarState({
        isOpen: true,
        severity: "error",
        message:
          "The Shortened URL provided was invalid. Create a new one now!",
      });
    }
  }, []);

  const onSubmitHandler = async () => {
    setIsSubmitting(true);
    if (isValidUrl(url)) {
      await axios
        .post("/", { url })
        .then((response) => {
          setUrl("");
          setModalState({
            isOpen: true,
            content: response?.data?.shortened_url ?? "Error",
          });
          setSnackbarState({
            severity: "success",
            isOpen: true,
            message: "Yay! You managed to shorten your URL!",
          });
        })
        .catch(() => {
          setSnackbarState({
            severity: "error",
            isOpen: true,
            message: "An error occured",
          });
        });
    } else {
      setSnackbarState({
        isOpen: true,
        message: "Oops! Please type in a valid URL format!",
        severity: "error",
      });
    }
    setIsSubmitting(false);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ ...snackbarState, isOpen: false });
  };

  const handleDialogClose = () =>
    setModalState({
      isOpen: false,
    });

  return (
    <>
      <div hidden={!modalState.isOpen} style={{ zIndex: 100 }}>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={50}
        />
      </div>
      <Container className="App">
        <Stack className="Stack">
          <Typography
            variant="h3"
            style={{ fontFamily: "Gill Sans Extrabold" }}
            gutterBottom
          >
            MinifyURL
          </Typography>
          <Typography variant="h5" gutterBottom>
            Type in your URL and watch us magically shorten it!
          </Typography>

          <Container>
            <Grid container spacing="1">
              <Grid item xs={12} sm={12} md={9}>
                {" "}
                <TextField
                  style={{ backgroundColor: "white", borderRadius: "4px" }}
                  fullWidth
                  value={url}
                  placeholder="Enter a valid URL to shorten!"
                  onChange={(e: any) => setUrl(e.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      onSubmitHandler();
                    }
                  }}
                  error={
                    snackbarState.severity === "error" &&
                    !!snackbarState.message
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                {" "}
                <Button
                  className="Button"
                  style={{ backgroundColor: "#5865f1" }}
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={onSubmitHandler}
                  disabled={isSubmitting}
                  endIcon={<BoltIcon />}
                >
                  Generate URL
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Typography variant="subtitle1">
            This is a free tool to shorten URLs and generate shorter links.
          </Typography>
          <Typography variant="subtitle1">
            A shorter URL makes it easier to share links without going over the
            character limit, like on Twitter/X!
          </Typography>
        </Stack>
        <MySnackbar
          isOpen={snackbarState.isOpen}
          severity={snackbarState.severity}
          message={snackbarState.message}
          handleSnackbarClose={handleSnackbarClose}
        />
        <MyDialog
          isOpen={modalState.isOpen}
          handleDialogClose={handleDialogClose}
          content={modalState.content}
        />
      </Container>
    </>
  );
}

export default App;

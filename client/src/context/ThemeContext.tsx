import React, { PropsWithChildren } from "react";
import {
  createTheme,
  ThemeProvider as _ThemeProvider,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    pikayellow: Palette["primary"];
  }

  interface PaletteOptions {
    pikayellow?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    pikayellow: {
      main: "#fcac15",
      light: "#E9DB5D",
      dark: "#ce8b10",
      contrastText: "#313338",
    },
  },
});

export const ThemeProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <_ThemeProvider theme={theme}>{children}</_ThemeProvider>;
};

import React, { PropsWithChildren } from "react";
import { TSnackBar } from "../types";

interface ISnackbarContext {
  snackbarState: TSnackBar;
  setSnackbarState: (values: TSnackBar) => void;
}

const SnackbarContext = React.createContext<ISnackbarContext>({
  snackbarState: {
    isOpen: false,
    message: "",
    severity: "success",
  },
  setSnackbarState: () => {
    return;
  },
});

export const SnackbarProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [snackbarState, _setSnackbarState] = React.useState<TSnackBar>({
    isOpen: false,
    message: "",
    severity: "success",
  });

  const setSnackbarState = (values: TSnackBar) => {
    _setSnackbarState(values);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarState,
        setSnackbarState,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export function useSnackbarContext() {
  return React.useContext(SnackbarContext);
}

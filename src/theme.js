import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00D1D1",
      light: "#5CFFFF",
      dark: "#00A3A3",
      contrastText: "#04141A",
    },
    secondary: {
      main: "#FFB74D",
    },
    error: {
      main: "#FF6B6B",
    },
    background: {
      default: "#0B1220",
      paper: "#111C2E",
    },
    text: {
      primary: "#E7F1F3",
      secondary: "#8FA3AF",
    },
    divider: "rgba(148, 190, 194, 0.16)",
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    overline: {
      letterSpacing: "0.14em",
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
import { ThemeProvider, CssBaseline, Stack } from "@mui/material";
import theme from "../../../theme";
import Weatherinfo from "../infopanel/InfoPanel";
import ChartsPanel from "../chartpanel/Chartpanel";

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        spacing={3}
        sx={{
          minHeight: "100vh",
          p: { xs: 2, sm: 4 },
          bgcolor: "background.default",
        }}
      >
        <Weatherinfo />
        <ChartsPanel />
      </Stack>
    </ThemeProvider>
  );
}

export default Main;

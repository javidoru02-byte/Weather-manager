import { ThemeProvider, CssBaseline, Stack } from "@mui/material";
import theme from "../../../theme";
import Weatherinfo from "../InfoPanel/InfoPanel";
import ChartsPanel from "../ChartPanel/ChartPanel";

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        spacing={3}
        sx={{
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

import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { Paper, Box, Stack, Typography } from "@mui/material";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { sortTemperatureForFiveDays } from "../../../utilits/sortWeather";
import { buildTemperatureChartConfig } from "./ChartTheme";

function ChartsPanel() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const forecastData = useSelector((state) => state.weather.forecastData);

  useEffect(() => {
    if (!forecastData) return undefined;

    const temperatures = sortTemperatureForFiveDays(forecastData.list);
    const labels = temperatures.map((day) => day.date);
    const temps = temperatures.map((day) => day.temp);

    chartInstanceRef.current?.destroy();
    chartInstanceRef.current = new Chart(
      chartRef.current,
      buildTemperatureChartConfig(labels, temps)
    );

    return () => chartInstanceRef.current?.destroy();
  }, [forecastData]);

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider" }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <ShowChartRoundedIcon sx={{ color: "primary.main" }} fontSize="small" />
        <Typography variant="overline" color="text.secondary">
          Прогноз на 5 днів
        </Typography>
      </Stack>
      <Box sx={{ height: { xs: 260, sm: 340 } }}>
        <canvas ref={chartRef} />
      </Box>
    </Paper>
  );
}

export default ChartsPanel;
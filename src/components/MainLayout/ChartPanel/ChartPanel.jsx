import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import { Box, Paper, Stack, Typography } from '@mui/material';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { sortTemperatureForFiveDays } from '../../../utilits/sortWeather';
import { buildTemperatureChartConfig } from './ChartTheme';

function ChartsPanel() {
  const { t, i18n } = useTranslation();
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
      buildTemperatureChartConfig(labels, temps, t),
    );

    return () => chartInstanceRef.current?.destroy();
  }, [forecastData, t, i18n.language]);

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, border: '1px solid', borderColor: 'divider' }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
        <ShowChartRoundedIcon sx={{ color: 'primary.main' }} fontSize="small" />
        <Typography variant="overline" color="text.secondary">
          {t('forecast.fiveDaysTitle')}
        </Typography>
      </Stack>
      <Box sx={{ height: { xs: 260, sm: 340 } }}>
        <canvas ref={chartRef} />
      </Box>
    </Paper>
  );
}

export default ChartsPanel;

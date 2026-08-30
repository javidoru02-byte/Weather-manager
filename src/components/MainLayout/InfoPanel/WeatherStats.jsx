import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Stack, Box, Typography } from "@mui/material";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import {
  formatVisibility,
  formatHumidity,
  formatWind,
  formatClouds,
  formatCoord,
  formatTime,
  formatTemperature,
} from "../../../utilits/formatWeather";

function WeatherStats({ weatherData, timezoneOffset }) {
  const { t } = useTranslation();
  const stats = useMemo(() => {
    if (!weatherData) return [];

    const lat = formatCoord(weatherData?.coord?.lat);
    const lon = formatCoord(weatherData?.coord?.lon);

    return [
      {
        icon: <ThermostatRoundedIcon fontSize="small" />,
        label: t("stats.feelsLike"),
        value: formatTemperature(weatherData?.main?.feels_like) ?? "—",
      },
      {
        icon: <VisibilityRoundedIcon fontSize="small" />,
        label: t("stats.visibility"),
        value: formatVisibility(weatherData?.visibility) ?? "—",
      },
      {
        icon: <WaterDropRoundedIcon fontSize="small" />,
        label: t("stats.humidity"),
        value: formatHumidity(weatherData?.main?.humidity) ?? "—",
      },
      {
        icon: <AirRoundedIcon fontSize="small" />,
        label: t("stats.wind"),
        value: formatWind(weatherData?.wind?.speed) ?? "—",
      },
      {
        icon: <CloudRoundedIcon fontSize="small" />,
        label: t("stats.clouds"),
        value: formatClouds(weatherData?.clouds?.all) ?? "—",
      },
      {
        icon: <WbTwilightRoundedIcon fontSize="small" />,
        label: t("stats.sunrise"),
        value: formatTime(weatherData?.sys?.sunrise, timezoneOffset) ?? "—",
      },
      {
        icon: <NightsStayRoundedIcon fontSize="small" />,
        label: t("stats.sunset"),
        value: formatTime(weatherData?.sys?.sunset, timezoneOffset) ?? "—",
      },
      {
        icon: <ExploreRoundedIcon fontSize="small" />,
        label: t("stats.coordinates"),
        value: lat && lon ? `${lat}, ${lon}` : "—",
      },
    ];
  }, [weatherData, timezoneOffset, t]);

  return (
    <Grid container spacing={2}>
      {stats.map((stat) => (
        <Grid key={stat.label} size={{ xs: 6, sm: 4, md: 3 }}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Box sx={{ color: "primary.main", mt: "2px" }}>{stat.icon}</Box>
            <Stack spacing={0.25}>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                {stat.value}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default WeatherStats;
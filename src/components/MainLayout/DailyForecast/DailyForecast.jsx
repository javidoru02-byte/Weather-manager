import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatTemperature } from "../../../utilits/formatWeather";
import { getDailyForecast } from "../../../utilits/groupForecastByDay";

const WEATHER_ICON_URL = "https://openweathermap.org/img/wn";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const DailyForecast = () => {
  const { t, i18n } = useTranslation();
  const { forecastData, loading, error } = useSelector(
    (state) => state.weather,
  );

  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t("forecast.loading")}
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="body2" color="error">
        {t("forecast.error")}
      </Typography>
    );
  }

  const days = getDailyForecast(forecastData?.list);

  if (!days.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t("forecast.empty")}
      </Typography>
    );
  }

  const currentLocale = i18n.language === "ua" ? "uk-UA" : "en-US";

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width: "100%",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {days.map((day) => {
        const date = new Date(day.dt_txt);
        const weekday = capitalize(
          date.toLocaleDateString(currentLocale, { weekday: "short" }),
        );
        const icon = day.weather?.[0]?.icon;
        const description = day.weather?.[0]?.description;

        return (
          <Card
            key={day.dt}
            elevation={0}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              textAlign: "center",
              minWidth: 100,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                p: 2,
                "&:last-child": { pb: 2 },
              }}
            >
              <Typography variant="overline" color="text.secondary">
                {weekday}
              </Typography>

              {icon && (
                <Box
                  component="img"
                  src={`${WEATHER_ICON_URL}/${icon}@2x.png`}
                  alt={description}
                  sx={{
                    width: 64,
                    height: 64,
                    display: "block",
                    mx: "auto",
                  }}
                />
              )}

              <Typography variant="body2" fontWeight={600}>
                {formatTemperature(day.main?.temp)}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};

export default DailyForecast;

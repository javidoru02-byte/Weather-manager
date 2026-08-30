import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Paper, Stack, Typography, Divider } from "@mui/material";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import {
  getWeather,
  getWeatherForFiveDays,
} from "../../../store/slices/weatherSlice";
import { useCitySuggestions } from "../../../hooks/useCitySuggestions";
import {
  formatCityLabel,
  formatTemperature,
} from "../../../utilits/formatWeather";
import CitySearch from "./CitySearch";
import WeatherStats from "./WeatherStats";

const SEARCH_DEBOUNCE_MS = 1500;

export const Weatherinfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const [lastSelectedLabel, setLastSelectedLabel] = useState(null);

  const { weatherData, error } = useSelector((state) => state.weather);
  const timezoneOffset = weatherData?.timezone ?? 0;

  const isSelectionFresh = inputValue === lastSelectedLabel;
  const { suggestions, isLoading } = useCitySuggestions(
    inputValue,
    isSelectionFresh,
  );

  const searchCity = useCallback(
    (query) => {
      const queryStr = typeof query === "string" ? query.trim() : query?.name;
      if (!queryStr) return;

      setCity(queryStr);
      dispatch(getWeather(query));
      dispatch(getWeatherForFiveDays(query));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isSelectionFresh) return undefined;
    if (!inputValue.trim()) return undefined;

    const timerId = setTimeout(
      () => searchCity(inputValue),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timerId);
  }, [inputValue, isSelectionFresh, searchCity]);

  const handleCitySelect = (option) => {
    const label = formatCityLabel(option);
    setLastSelectedLabel(label);
    setInputValue(label);
    searchCity(option.name);
  };

  const tempValue = weatherData?.main?.temp;

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, border: "1px solid", borderColor: "divider" }}
    >
      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <PlaceRoundedIcon sx={{ color: "primary.main" }} fontSize="small" />
          <Typography variant="overline" color="text.secondary">
            {t("search.weatherStation")}
          </Typography>
        </Stack>

        <CitySearch
          inputValue={inputValue}
          onInputChange={setInputValue}
          onCitySelect={handleCitySelect}
          suggestions={suggestions}
          isLoading={isLoading}
          error={error}
        />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 1 }}>
        <Typography variant="h3" sx={{ fontFamily: "monospace" }}>
          {tempValue !== undefined && tempValue !== null
            ? formatTemperature(tempValue)
            : "--°"}
        </Typography>
        <Typography variant="h6" color="text.secondary" noWrap>
          {city || t("search.cityPlaceholder")}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <WeatherStats weatherData={weatherData} timezoneOffset={timezoneOffset} />
    </Paper>
  );
};

export default Weatherinfo;

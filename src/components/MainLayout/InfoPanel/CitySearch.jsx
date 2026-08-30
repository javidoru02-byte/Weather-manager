import {
  Autocomplete,
  TextField,
  InputAdornment,
  CircularProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTranslation } from "react-i18next";
import { formatCityLabel } from "../../../utilits/formatWeather";

const isSameCity = (option, value) =>
  typeof value === "string"
    ? option.name === value
    : option.lat === value.lat && option.lon === value.lon;

const buildInputSlotProps = (params, isLoading) => ({
  ...params.slotProps?.input,
  startAdornment: (
    <InputAdornment position="start">
      <SearchRoundedIcon sx={{ color: "text.secondary" }} />
    </InputAdornment>
  ),
  endAdornment: (
    <>
      {isLoading && <CircularProgress color="inherit" size={16} />}
      {params.slotProps?.input?.endAdornment}
    </>
  ),
});

function CitySearch({ inputValue, onInputChange, onCitySelect, suggestions, isLoading, error }) {
  const { t } = useTranslation();
  return (
    <Stack spacing={1}>
      <Autocomplete
        freeSolo
        fullWidth
        options={suggestions}
        loading={isLoading}
        filterOptions={(options) => options}
        inputValue={inputValue}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : formatCityLabel(option)
        }
        isOptionEqualToValue={isSameCity}
        onInputChange={(_event, newValue) => onInputChange(newValue)}
        onChange={(_event, newValue) => {
          if (newValue && typeof newValue !== "string") {
            onCitySelect(newValue);
          }
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box component="li" key={key} {...optionProps}>
              <Stack>
                <Typography variant="body2">{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {[option.state, option.country].filter(Boolean).join(", ")}
                </Typography>
              </Stack>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t("search.searchPlaceholder")}
            variant="outlined"
            slotProps={{
              ...params.slotProps,
              input: buildInputSlotProps(params, isLoading),
            }}
          />
        )}
      />

      {error && (
        <Typography variant="body2" color="error">
          {t("search.cityNotFound")}
        </Typography>
      )}
    </Stack>
  );
}

export default CitySearch;
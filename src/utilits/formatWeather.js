export const formatVisibility = (meters) => {
  if (meters == null) return "-";
  return `${(meters / 1000).toFixed(1)} км`;
};

export const formatHumidity = (percent) => {
  if (percent == null) return "-";
  return `${percent}%`;
};

export const formatWind = (speedMs) => {
  if (speedMs == null) return "-";
  const kmh = speedMs * 3.6;
  return `${kmh.toFixed(1)} км/год`;
};

export const formatClouds = (percent) => {
  if (percent == null) return "-";
  return `${percent}%`;
};

export const formatCoord = (value) => {
  if (value == null) return "-";
  return `${value.toFixed(2)}°`;
};

/**
  @param {number} timestamp
  @param {number} timezoneOffsetSec
 */

export const formatTime = (timestamp, timezoneOffsetSec = 0) => {
  if (timestamp == null) return "-";
  const date = new Date((timestamp + timezoneOffsetSec) * 1000);
  return date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const formatTemperature = (celsius) => {
  if (celsius == null) return "-";
  return `${Math.round(celsius)}°C`;
};

export const formatCityLabel = (city) => {
  if (!city) return "";
  return [city.name, city.state, city.country].filter(Boolean).join(", ");
};

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeather,
  getWeatherForFiveDays,
} from "../../../store/slices/weatherSlice";
import {
  formatVisibility,
  formatHumidity,
  formatWind,
  formatClouds,
  formatCoord,
  formatTime,
} from "../../../utilits/formatWeather";
import "./InfoPanel.css";

export const Weatherinfo = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const { weatherData, error } = useSelector((state) => state.weather);
  const timezoneOffset = weatherData?.timezone ?? 0;

  const hendleInputChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    const timerId = setTimeout(() => {
      dispatch(getWeather(trimmedCity));
      dispatch(getWeatherForFiveDays(trimmedCity));
    }, 800);

    return () => clearTimeout(timerId);
  }, [city, dispatch]);

  return (
    <div className="infoBox">
      <div className="InfoBlock">
        <p>{city || "Введіть назву міста.."}</p>
        {error && (
          <p className="error">Місто не знайдено</p>
        )}
        <p>Видимість: {formatVisibility(weatherData?.visibility)}</p>
        <p>Вологість: {formatHumidity(weatherData?.main?.humidity)}</p>
        <p>
          Схід сонця: {formatTime(weatherData?.sys?.sunrise, timezoneOffset)}
        </p>
        <p>Вітер: {formatWind(weatherData?.wind?.speed)}</p>
        <p>Хмарність: {formatClouds(weatherData?.clouds?.all)}</p>
        <p>
          Захід сонця: {formatTime(weatherData?.sys?.sunset, timezoneOffset)}
        </p>
        <p>Широта: {formatCoord(weatherData?.coord?.lat)}</p>
        <p>Довгота: {formatCoord(weatherData?.coord?.lon)}</p>
      </div>

      <form className="buttons-container">
        <input type="text" value={city} onChange={hendleInputChange} />
      </form>
    </div>
  );
};
export default Weatherinfo;

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getWeather,
  getWeatherForFiveDays,
} from "../../../store/slices/weatherSlice";

export const Weatherinfo = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const handleGetWeather = (e) => {
    e.preventDefault();

    if (!city.trim()) return;
    dispatch(getWeather(city));
    dispatch(getWeatherForFiveDays(city));
  };

  function onInputChange(e) {
    const { value } = e.target;
    setCity(value);
  }

  return (
    <form className="buttons-container" onSubmit={handleGetWeather}>
      <input type="text" value={city} onChange={onInputChange} />
      <button type="submit">Пошук</button>
    </form>
  );
};
export default Weatherinfo;

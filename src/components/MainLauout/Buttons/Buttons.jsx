import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeather,
  getFiveDayWeather,
} from "../../../store/slices/weatherSlice";
import { addFavourite } from "../../../store/slices/favouritesSlice";
import "./Buttons.css";

function Buttons() {
  const [cityName, setCityName] = useState("");

  const weather = useSelector((state) => state.weatherInfo.weather);
  const dispatch = useDispatch();

  function onInputChange(e) {
    const { value } = e.target;
    setCityName(value);
  }

  function onClick() {
    if (cityName.trim()) {
      dispatch(getWeather(cityName));
      dispatch(getFiveDayWeather(cityName));
    }
  }

  function onFavouriteClick() {
    if (weather) {
      dispatch(addFavourite(weather));
    }
  }

  return (
    <div className="buttons">
      <input
        name="input"
        type="text"
        placeholder="Введіть місто..."
        value={cityName}
        onChange={onInputChange}
      />
      <button onClick={onClick}>Погода на сьогодні</button>
      <button>на завтра</button>
      <button>обрати діапазон</button>
      {weather && (
        <button onClick={onFavouriteClick}>Додати до фаворитів</button>
      )}
    </div>
  );
}

export default Buttons;
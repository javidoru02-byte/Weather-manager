import { useState } from "react";
import "./Buttons.css";

import {
  getWeather,
  getFiveDayWeather,
} from "../../../store/slices/weatherSlice";
import { addFavourite } from "../../../store/slices/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

function Buttons() {
  const [cityName, setCityName] = useState("");

  const weather = useSelector((state) => state.weatherInfo.weather);

  const dispatch = useDispatch();

  function onInputChange(e) {
    const { value } = e.target;
    setCityName(value);
  }
  function onClick() {
    dispatch(getWeather(cityName));
    dispatch(getFiveDayWeather(cityName));
  }

  function onFavouriteClick() {
    dispatch(addFavourite(weather));
  }

  return (
    <>
      <input name="input" type="text" onChange={onInputChange} />
      <button onClick={onClick}>Погода на сьогодні</button>
      {weather && (
        <button onClick={onFavouriteClick}>Додати до фаворитів</button>
      )}
    </>
  );
}

export default Buttons;

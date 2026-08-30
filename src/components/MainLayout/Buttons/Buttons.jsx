import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeather,
  getFiveDayWeather,
} from "../../../store/slices/weatherSlice";
import { useTranslation } from "react-i18next";
import { addFavourite } from "../../../store/slices/favouritesSlice";
import "./Buttons.css";

function Buttons() {
  const { t } = useTranslation();
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
      <button onClick={onClick}>{t("buttons.today")}</button>
      <button>{t("buttons.tomorrow")}</button>
      <button>{t("buttons.selectRange")}</button>
      {weather && (
        <button onClick={onFavouriteClick}>{t("buttons.addToFavourites")}</button>
      )}
    </div>
  );
}
// ніде не використовується, вся логіка в InfoPanel через автокомпліт (Kiril)
export default Buttons;
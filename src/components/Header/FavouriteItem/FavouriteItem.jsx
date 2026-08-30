import { getWeather } from "../../../store/slices/weatherSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { delFavourite } from "../../../store/slices/favouritesSlice";
import "./FavouriteItem.css";

export default function FavouriteItem({ favourite }) {
  const { t } = useTranslation();
  const { name, lat, lon, id } = favourite;
  const dispatch = useDispatch();

  function onFavouriteDelete() {
    dispatch(delFavourite(id));
  }
  function onFavouriteDoubleClick() {
    dispatch(getWeather(name));
  }
  return (
    <div className="container" onDoubleClick={onFavouriteDoubleClick}>
      <div className="item">
        <p>{name}</p>
        <p>{lat}</p>
        <p>{lon}</p>
        <button onClick={onFavouriteDelete} title={t("favourites.deleteTooltip")} aria-label={t("favourites.deleteTooltip")}>X</button>
      </div>
    </div>
  );
}

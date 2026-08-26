import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import FavouriteItem from "../FavouriteItem/FavouriteItem";

import { getFavourites } from "../../../store/slices/favouritesSlice";

import "./FavouritesList.css";

export default function Favourites() {
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favouritesList.favourites);

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  return (
    <div>
      {favourites.map((favourite) => (
        <FavouriteItem key={favourite.id} favourite={favourite} />
      ))}
    </div>
  );
}

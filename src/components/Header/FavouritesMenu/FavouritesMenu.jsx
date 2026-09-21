import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {
  getWeather,
  getWeatherForFiveDays,
} from "../../../store/slices/weatherSlice";
import { delFavourite } from "../../../store/slices/favouritesSlice";

function FavouritesMenu({ anchorEl, open, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favouritesList.favourites);

  const handleSelect = (favourite) => {
    dispatch(getWeather(favourite.name));
    dispatch(getWeatherForFiveDays(favourite.name));
    onClose();
  };

  const handleDelete = (event, id) => {
    event.stopPropagation();
    dispatch(delFavourite(id));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { minWidth: 260, maxWidth: 320 } } }}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {t("header.favourites")}
        </Typography>
      </Box>
      <Divider />

      {favourites.length === 0 && (
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            {t("favourites.empty")}
          </Typography>
        </Box>
      )}

      {favourites.map((favourite) => (
        <MenuItem
          key={favourite.id}
          onClick={() => handleSelect(favourite)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <LocationOnRoundedIcon
              fontSize="small"
              sx={{ color: "primary.main", flexShrink: 0 }}
            />
            <Typography variant="body2" noWrap>
              {favourite.name}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={(event) => handleDelete(event, favourite.id)}
            title={t("favourites.deleteTooltip")}
            aria-label={t("favourites.deleteTooltip")}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default FavouritesMenu;
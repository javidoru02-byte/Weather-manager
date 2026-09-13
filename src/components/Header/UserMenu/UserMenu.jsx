import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { logoutUser } from "../../../store/slices/authSlice";

function UserMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const isAuth = Boolean(token);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    handleCloseUserMenu();
    navigate(path);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={isAuth ? (user?.firstName || t("header.profile")) : t("header.auth")}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.firstName || "User"} src={user?.avatar || ""}>
            {user?.firstName ? user.firstName[0].toUpperCase() : null}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar-user"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {isAuth ? (
          <>
            <MenuItem onClick={() => handleNavigate("/profile")}>
              <Typography sx={{ textAlign: "center" }}>
                {t("header.profile")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography sx={{ textAlign: "center", color: "error.main" }}>
                {t("profile.logoutButton")}
              </Typography>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleNavigate("/auth")}>
            <Typography sx={{ textAlign: "center" }}>
              {t("header.auth")}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}

export default UserMenu;
import * as React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  { key: "header.home", path: "/" },
  { key: "header.favourites", path: "/favourites" },
];

const settings = [
  { key: "header.profile", path: "/profile" },
  { key: "header.auth", path: "/auth" },
];

function Header() {
  const { t } = useTranslation();
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  const handleUserSettingClick = (path) => {
    handleCloseUserMenu();
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box
            component="img"
            src="/favicon.jpg"
            alt="Weather"
            sx={{
              display: { xs: "none", md: "flex" },
               width: 40,
               height: 40,
               objectFit: "contain",
                mr: 1,
            }}
          />

          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WEATHER
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.key}
                  onClick={() => handleMenuItemClick(page.path)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {t(page.key)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
           component="img"
           src="/favicon.jpg"
           alt="Weather"
           sx={{
             display: { xs: "flex", md: "none" },
             width: 40,
             height: 40,
             objectFit: "contain",
             mr: 1,
             }}
          />

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WEATHER
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={t(page.key)}
                component={NavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&.active": { fontWeight: "bold", textDecoration: "underline" },
                }}
              >
                {t(page.key)}
              </Button>
            ))}
          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t("header.profile")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Profile" />
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.key}
                  onClick={() => handleUserSettingClick(setting.path)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {t(setting.key)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LanguageSwitcher />    
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
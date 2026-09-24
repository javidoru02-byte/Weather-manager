import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import FavouritesMenu from '../FavouritesMenu/FavouritesMenu';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import UserMenu from '../UserMenu/UserMenu';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElFavourites, setAnchorElFavourites] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenFavouritesMenu = (event) => {
    setAnchorElFavourites(event.currentTarget);
  };

  const handleCloseFavouritesMenu = () => {
    setAnchorElFavourites(null);
  };

  const handleMobileHomeClick = () => {
    handleCloseNavMenu();
    navigate('/');
  };

  const handleMobileFavouritesClick = (event) => {
    handleOpenFavouritesMenu(event);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 1 0' }}>
            <Box
              component="img"
              src="/favicon.jpg"
              alt="Weather"
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: 40,
                height: 40,
                objectFit: 'contain',
                mr: 1,
              }}
            />

            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              WEATHER
            </Typography>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={handleMobileHomeClick}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {t('header.home')}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleMobileFavouritesClick}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {t('header.favourites')}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              component="img"
              src="/favicon.jpg"
              alt="Weather"
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: 40,
                height: 40,
                objectFit: 'contain',
                mr: 1,
              }}
            />

            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              WEATHER
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flex: '1 1 0',
              justifyContent: 'center',
            }}
          >
            <Button
              component={NavLink}
              to="/"
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                '&.active': { fontWeight: 'bold', textDecoration: 'underline' },
              }}
            >
              {t('header.home')}
            </Button>

            <Button
              onClick={handleOpenFavouritesMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {t('header.favourites')}
            </Button>
          </Box>

          <FavouritesMenu
            anchorEl={anchorElFavourites}
            open={Boolean(anchorElFavourites)}
            onClose={handleCloseFavouritesMenu}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: '1 1 0',
              gap: 1.5,
            }}
          >
            <UserMenu />
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

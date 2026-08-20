import TitleMenu from '../TitleMenu/TitleMenu';
import Login from '../Login/Login';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { IconButton } from '@mui/material'; 
import './Header.css';

function Header() {
  return (
    <header className="header">
      <IconButton color="inherit">
        <WbSunnyIcon sx={{ fontSize: '40px' }} />
      </IconButton>

      <TitleMenu />
      <Login />
    </header>
  );
}

export default Header;
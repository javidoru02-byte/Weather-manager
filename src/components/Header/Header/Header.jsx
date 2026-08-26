import TitleMenu from '../TitleMenu/TitleMenu';
import Login from '../Login/Login';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="headerLogo">лого</div>
      <TitleMenu />
      <Login />
    </header>
  );
}

export default Header;
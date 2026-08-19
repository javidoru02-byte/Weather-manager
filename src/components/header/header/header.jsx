import TitleMenu from '../titleMenu/titleMenu';
import Login from '../login/login';
import './header.css';

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
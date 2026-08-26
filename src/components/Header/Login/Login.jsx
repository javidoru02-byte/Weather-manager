import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();

  function onLogout() {
    navigate("/auth");
  }

  return (
    <div className="login">
      <span>авторизація</span>
      <div className="loginAvatar" />
      <button className="logoutBtn" onClick={onLogout} title="Вийти">вийти</button>
    </div>
  );
}

export default Login;
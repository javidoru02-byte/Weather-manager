import { useNavigate } from "react-router-dom";
import "./authPage.css";

function AuthPage() {
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h2>Реєстрація</h2>
        <form onSubmit={onSubmit}>
          <input type="text"/>
          <input type="email"/>
          <input type="password"/>
          <button type="submit">ЗАРЕЄСТРУВАТИСЯ ТА УВІЙТИ</button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
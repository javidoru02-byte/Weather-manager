import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  function onAuthClick() {
    navigate("/auth");
  }

  return (
    <div className="login">
      <IconButton color="inherit" onClick={onAuthClick} title="Авторизація / Вихід">
        <AccountCircleIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </div>
  );
}

export default Login;
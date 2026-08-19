import './Login.css';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Button } from '@mui/material';

function Login() {
  return (
      <Button
      startIcon={<LoginOutlinedIcon />}
      >
        авторизація
      </Button>

  );
}

export default Login;
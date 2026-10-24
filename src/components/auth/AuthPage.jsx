import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAuthError, login, register } from '../../store/slices/authSlice';

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.auth);

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const isRegister = mode === 'register';

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (isRegister) {
      const registerResult = await dispatch(register(form));
      if (register.fulfilled.match(registerResult)) {
        const loginResult = await dispatch(
          login({ email: form.email, password: form.password }),
        );
        if (login.fulfilled.match(loginResult)) {
          navigate('/');
        }
      }
      return;
    }

    const loginResult = await dispatch(
      login({ email: form.email, password: form.password }),
    );
    if (login.fulfilled.match(loginResult)) {
      navigate('/');
    }
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Stack spacing={1} sx={{ alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <LockOutlinedIcon />
          </Box>
          <Typography variant="h5" fontWeight={700}>
            {isRegister ? t('auth.title') : t('auth.loginTitle')}
          </Typography>
        </Stack>

        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            {isRegister && (
              <TextField
                fullWidth
                required
                name="name"
                label={t('auth.namePlaceholder')}
                value={form.name}
                onChange={handleChange}
              />
            )}

            <TextField
              fullWidth
              required
              type="email"
              name="email"
              label={t('auth.emailPlaceholder')}
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              required
              type="password"
              name="password"
              label={t('auth.passwordPlaceholder')}
              value={form.password}
              onChange={handleChange}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isFetching}
              sx={{ mt: 1 }}
            >
              {isFetching
                ? '...'
                : isRegister
                  ? t('auth.submitButton')
                  : t('auth.loginButton')}
            </Button>
          </Stack>
        </Box>

        <Stack sx={{ alignItems: 'center', mt: 2.5 }}>
          <Button
            type="button"
            variant="text"
            size="small"
            onClick={() => {
              dispatch(clearAuthError());
              setMode(isRegister ? 'login' : 'register');
            }}
            sx={{ textTransform: 'none' }}
          >
            {isRegister ? t('auth.switchToLogin') : t('auth.switchToRegister')}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AuthPage;

import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { sendResetCode } from '../../../../store/slices/authSlice';

export default function VerifyCodeForm({
  user,
  initialCodeSent = false,
  onSuccess,
  onClose,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(user?.email || '');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(
    initialCodeSent || Boolean(user),
  );

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError(t('auth.errors.emailRequired'));
      return;
    }

    setLoading(true);
    setError('');

    const res = await dispatch(
      sendResetCode({ email: email.trim().toLowerCase() }),
    );
    setLoading(false);

    if (res.error) {
      setError(
        res.payload === 'userNotFound'
          ? t('auth.errors.userNotFound')
          : t('auth.errors.serverError'),
      );
    } else {
      setIsCodeSent(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = sessionStorage.getItem('reset_session');

    if (!saved) {
      setError(t('auth.errors.codeExpired'));
      return;
    }

    const parsed = JSON.parse(saved);
    const targetEmail = (user?.email || email).trim().toLowerCase();

    if (parsed.email.toLowerCase() !== targetEmail) {
      setError(t('auth.errors.codeEmailMismatch'));
      return;
    }

    if (parsed.code !== code.trim()) {
      setError(t('auth.errors.invalidCode'));
      return;
    }

    setError('');
    onSuccess(code.trim(), targetEmail);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        {isCodeSent && (
          <Alert severity="info">{t('profile.password.demoCodeAlert')}</Alert>
        )}

        {!user ? (
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {t('profile.password.enterEmailPrompt')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                required
                type="email"
                size="small"
                label={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={handleSendCode}
                disabled={loading}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {loading ? '...' : t('profile.password.sendCodeBtn')}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('profile.password.codeSentTo', { email: user.email })}
          </Typography>
        )}

        <TextField
          fullWidth
          required
          label={t('profile.password.codePlaceholder')}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'flex-end', pt: 1 }}
        >
          <Button onClick={onClose} color="inherit">
            {t('profile.password.cancelBtn')}
          </Button>
          <Button type="submit" variant="contained">
            {t('profile.password.nextBtn')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

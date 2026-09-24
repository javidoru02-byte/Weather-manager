import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { resetPasswordWithCode } from '../../../../store/slices/authSlice';

export default function SetNewPasswordForm({
  user,
  targetEmail,
  verifiedCode,
  onSuccess,
  onClose,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError(t('auth.errors.passwordMinLength'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t('auth.errors.passwordsMismatch'));
      return;
    }

    setLoading(true);
    setError('');

    const emailToReset = user?.email || targetEmail;

    const res = await dispatch(
      resetPasswordWithCode({
        email: emailToReset,
        code: verifiedCode,
        newPassword,
      }),
    );

    setLoading(false);

    if (res.error) {
      setError(t('auth.errors.serverError'));
    } else {
      onSuccess();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          required
          type="password"
          label={t('profile.password.newPassword')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <TextField
          fullWidth
          required
          type="password"
          label={t('profile.password.confirmPassword')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'flex-end', pt: 1 }}
        >
          <Button onClick={onClose} color="inherit">
            {t('profile.password.cancelBtn')}
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '...' : t('profile.password.setNewPasswordBtn')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

import {
  Alert,
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChangePasswordDialog from './ChangePassword/ChangePasswordDialog';

import { logout, updateUser } from '../../../store/slices/authSlice';

function UserProfile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, isFetching } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    const res = await dispatch(updateUser({ name, email: user.email }));

    if (!res.error) {
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        my: 4,
        p: 3,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '12px',
      }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        {t('profile.title')}
      </Typography>

      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {t('profile.saveSuccess')}
        </Alert>
      )}

      <Stack spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
        <Avatar alt={name || 'User'} sx={{ width: 80, height: 80 }}>
          {name ? name[0].toUpperCase() : null}
        </Avatar>
      </Stack>

      <Box component="form" onSubmit={handleSave}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            disabled
            label={t('auth.emailPlaceholder')}
            value={user?.email || ''}
          />

          <TextField
            fullWidth
            required
            label={t('auth.namePlaceholder')}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isFetching}
          >
            {isFetching ? '...' : t('profile.saveButton')}
          </Button>

          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => setIsPasswordModalOpen(true)}
          >
            {t('profile.changePasswordButton')}
          </Button>

          <Button
            type="button"
            variant="text"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            {t('profile.logoutButton')}
          </Button>
        </Stack>
      </Box>
      <ChangePasswordDialog
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        user={user}
      />
    </Box>
  );
}

export default UserProfile;

import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../../constants/constants';
import { loginWithGoogle } from '../../store/slices/authSlice';

let isGoogleScriptInitialized = false;

function GoogleLoginButton() {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!window.google?.accounts?.id || !buttonRef.current) return;

    if (!isGoogleScriptInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (response.credential) {
            dispatch(loginWithGoogle(response.credential));
          }
        },
      });
      isGoogleScriptInitialized = true;
    }

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: 'icon',
      shape: 'circle',
      size: 'large',
      theme: 'filled_black',
    });
  }, [dispatch]);

  return (
    <Box
      ref={buttonRef}
      sx={{
        width: 40,
        height: 40,
        mx: 'auto',
      }}
    />
  );
}

export default GoogleLoginButton;

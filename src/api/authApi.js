import { jwtDecode } from 'jwt-decode';
import { AUTH_SLICE_NAME } from '../constants/constants';
import { jsonApi } from './favourites';

export const authApi = {
  async googleLogin(credential) {
    const googleData = jwtDecode(credential);
    const cleanEmail = googleData.email.trim().toLowerCase();

    const { data: users } = await jsonApi.get(
      `/${AUTH_SLICE_NAME}?email=${cleanEmail}`,
    );
    let user = users[0];

    if (!user) {
      const { data: newUser } = await jsonApi.post(`/${AUTH_SLICE_NAME}`, {
        email: cleanEmail,
        firstName: googleData.given_name || '',
        lastName: googleData.family_name || '',
        avatar: googleData.picture || '',
        isGoogleAuth: true,
      });
      user = newUser;
    }

    const token = crypto.randomUUID();
    const { password, ...safeUser } = user; // eslint-disable-line

    return { user: safeUser, token };
  },

  async sendResetCode(email) {
    const cleanEmail = email.trim().toLowerCase();
    const { data: users } = await jsonApi.get(
      `/${AUTH_SLICE_NAME}?email=${cleanEmail}`,
    );

    if (users.length === 0) {
      throw new Error('userNotFound');
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem(
      'reset_session',
      JSON.stringify({ email: cleanEmail, code }),
    );

    console.log(`[EMAIL] Лист надіслано на ${cleanEmail}. Ваш код: ${code}`); // тимчасово поки без беку (Kiril)
    return { success: true };
  },

  async resetPasswordWithCode({ email, code, newPassword }) {
    const savedSession = sessionStorage.getItem('reset_session');
    if (!savedSession) throw new Error('codeExpired');

    const parsed = JSON.parse(savedSession);
    const cleanEmail = email.trim().toLowerCase();

    if (
      parsed.email.toLowerCase() !== cleanEmail ||
      String(parsed.code) !== String(code).trim()
    ) {
      throw new Error('invalidCode');
    }

    const { data: users } = await jsonApi.get(
      `/${AUTH_SLICE_NAME}?email=${cleanEmail}`,
    );
    const user = users[0];
    if (!user) throw new Error('userNotFound');

    await jsonApi.patch(`/${AUTH_SLICE_NAME}/${user.id}`, {
      password: String(newPassword),
    });

    sessionStorage.removeItem('reset_session');
    return { success: true };
  },
};

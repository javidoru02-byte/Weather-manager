import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header/Header';
import UserProfile from './components/Header/UserProfile/UserProfile';
import MainLayout from './components/MainLayout/Main/Main';
import AuthPage from './components/auth/AuthPage';
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from './components/common/RouteGuards';
import { getFavourites } from './store/slices/favouritesSlice';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d162c',
      light: '#D6C8E1',
      dark: '#82A2B5',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route
              path="/auth"
              element={
                <PublicOnlyRoute>
                  <AuthPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

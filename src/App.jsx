import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header/Header/Header";
import MainLayout from "./components/MainLayout/Main/Main";
import Footer from "./components/Footer/Footer";
import AuthPage from "./components/auth/AuthPage";
import UserProfile from "./components/Header/UserProfile/UserProfile";
import { getFavourites } from "./store/slices/favouritesSlice";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d162c",
      light: "#D6C8E1",
      dark: "#82A2B5",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getFavourites());
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header/Header/Header";
import MainLayout from "./components/MainLayout/Main/Main";
import Footer from "./components/Footer/Footer";
import FavouritesList from "./components/Header/FavouritesList/FavouritesList";
import AuthPage from "./components/auth/authPage";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/favourites" element={<FavouritesList />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
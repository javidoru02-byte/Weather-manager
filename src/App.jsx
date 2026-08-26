import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header/Header";
import MainLayout from "./components/MainLauout/MainLayout/MainLayout";
import Footer from "./components/Footer/Footer";
import FavouritesList from "./components/Header/FavouritesList/FavouritesList";
import AuthPage from "./components/auth/authPage";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;

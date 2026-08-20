import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header/header";
import MainLayout from "./components/mainLayout/mainLayout/mainLayout";
import Footer from "./components/footer/footer";
import FavouritesList from "./components/header/favouritesList/FavouritesList";
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

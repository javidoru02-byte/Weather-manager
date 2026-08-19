import Header from "./components/header/header/header";
import MainLayout from "./components/mainLayout/mainLayout/mainLayout";
import Footer from "./components/footer/footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <MainLayout />
      <Footer />
    </div>
  );
}

export default App;

import Header from './components/Header/Header/Header'
import MainLayout from './components/MainLauout/MainLayout/MainLayout';
import Footer from './components/Footer/Footer';

import "./App.css";

function App() {
    return(
        <div className="app">
            <Header />
            <MainLayout />
            <Footer />
        </div>
    )
}

export default App;

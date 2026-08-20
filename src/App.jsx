import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header/Header/Header'
import MainLayout from './components/MainLauout/MainLayout/MainLayout';
import Footer from './components/Footer/Footer';

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#7d75ee',
      light: '#D6C8E1',
      dark: '#82A2B5'
    }
  }
});

function App() {
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
                <Header />
                <MainLayout />
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App;
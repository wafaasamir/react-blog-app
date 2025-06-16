import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPost from './pages/AddPost';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f5061',
    },
    secondary: {
      main: '#4297a0',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-post" element={<AddPost />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 
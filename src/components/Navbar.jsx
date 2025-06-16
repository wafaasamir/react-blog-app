import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutConfirmation from './LogoutConfirmation';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'secondary.main' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer',mx:2 }}
            onClick={() => navigate('/')}
          >
            Blog App
          </Typography>
          {user ? (
            <>
              <IconButton
                color="inherit"
                onClick={() => navigate('/add-post')}
                sx={{ mr: 2 }}
              >
                <AddIcon />
              </IconButton>
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')} sx={{mx:2}}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')} sx={{mx:2}}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <LogoutConfirmation
        open={isLogoutDialogOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar; 
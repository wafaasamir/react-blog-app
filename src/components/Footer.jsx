import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.secondary.main
            : theme.palette.secondary.main,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="white" align="center" sx={{fontWeight:'bold' ,fontSize:'1.2rem'  }}>
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="/" sx={{textDecoration:'none' ,mx:1}}>
            Blog App
          </Link>
          {'  All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 
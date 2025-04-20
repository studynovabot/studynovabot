'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          StudyNova Bot
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/leaderboard">
            Leaderboard
          </Button>
          <Button color="inherit" href="/tasks">
            Tasks
          </Button>
          <Button color="inherit" href="/upgrade">
            Upgrade
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
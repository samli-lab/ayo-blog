'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: 'transparent',
        color: 'text.secondary',
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        opacity: 0.8
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ letterSpacing: '0.05rem' }}>
          © 2016 - {new Date().getFullYear()} · 记录 · 思考 · 分享
        </Typography>
      </Container>
    </Box>
  );
}


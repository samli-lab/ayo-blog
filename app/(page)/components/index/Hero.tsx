'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@emotion/react';

const scrollDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

export default function Hero() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url(/images/index/iQ19bEnG9yE.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }
      }}
    >
      <Container sx={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        <Typography variant="h4" component="h2" sx={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          fontWeight: 300,
          fontSize: { xs: '1.2rem', md: '2rem' },
          opacity: 0.9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          记录 · 思考 · 分享
          <Box
            component="span"
            sx={{
              ml: 1,
              animation: `${blink} 1s infinite`,
              fontWeight: 700
            }}
          >
            _
          </Box>
        </Typography>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          animation: `${scrollDown} 1.5s infinite`,
          cursor: 'pointer',
          zIndex: 1
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 40, color: '#fff' }} />
      </Box>
    </Box>
  );
}


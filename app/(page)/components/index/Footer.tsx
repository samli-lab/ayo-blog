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
        <Typography variant="body2" align="center" sx={{ letterSpacing: '0.05rem', mb: 1 }}>
          © 2016 - {new Date().getFullYear()} · 记录 · 思考 · 分享
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            fontSize: '0.875rem',
            opacity: 0.7,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 2 },
            '& a': {
              color: 'inherit',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1,
                textDecoration: 'underline'
              }
            }
          }}
        >
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            京ICP备15061739号-3
          </a>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>|</Box>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402055306"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Box
              component="img"
              src="/ba.png"
              alt="公安备案图标"
              sx={{ width: 14, height: 14 }}
            />
            <span>京公网安备11011402055306号</span>
          </a>
        </Typography>
      </Container>
    </Box>
  );
}


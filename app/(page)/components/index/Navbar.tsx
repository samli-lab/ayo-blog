'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleMobileMenuItemClick = (path: string) => {
    router.push(path);
    handleMobileMenuClose();
  };

  React.useEffect(() => {
    const handleScroll = () => {
      // 这里的阈值可以根据 Hero 的高度调整，通常 60 或者 100 比较合适
      const isScrolled = window.scrollY > 60;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: '首页', path: '/' },
    { name: '文章', path: '/blog' },
    { name: '图库', path: '/gallery' },
    { name: '关于', path: '/about' }
  ];

  // 在首页且没滚动时，完全隐藏导航栏
  const isVisible = !isHomePage || scrolled;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled || !isHomePage
          ? 'rgba(255, 255, 255, 0.85)'
          : 'transparent',
        backdropFilter: scrolled || !isHomePage ? 'blur(10px)' : 'none',
        boxShadow: (scrolled || !isHomePage) ? '0 5px 6px -5px rgba(133,133,133,0.6)' : 'none',
        color: scrolled || !isHomePage ? 'text.primary' : '#fff',
        transition: 'all 0.4s ease-in-out',
        backgroundImage: 'none',
        // 关键：在顶部时不展示
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 1200
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SAM LI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="打开导航菜单"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={mobileMenuAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => handleMobileMenuItemClick(item.path)}
                  selected={pathname === item.path}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SAM LI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.path}
                sx={{
                  my: 2,
                  mx: 1.5,
                  color: 'inherit',
                  display: 'block',
                  fontWeight: 500,
                  fontSize: '1rem',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


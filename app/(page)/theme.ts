"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#49b1f5", // Butterfly default blue
    },
    background: {
      default: "#f4f5f5", // Light gray background
    },
    text: {
      primary: "#4c4948",
    },
  },
  typography: {
    fontFamily:
      "'LXGW WenKai Light', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeightRegular: 400,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 4px 8px 6px rgba(7,17,27,0.06)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 4px 12px 12px rgba(7,17,27,0.15)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme;

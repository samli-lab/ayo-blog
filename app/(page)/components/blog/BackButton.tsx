"use client";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface BackButtonProps {
  variant?: "text" | "outlined" | "contained";
  sx?: object;
}

export default function BackButton({
  variant = "text",
  sx,
}: BackButtonProps) {
  return (
    <Button
      component={Link}
      href="/blog"
      startIcon={<ArrowBackIcon />}
      variant={variant}
      sx={sx}
    >
      返回博客列表
    </Button>
  );
}


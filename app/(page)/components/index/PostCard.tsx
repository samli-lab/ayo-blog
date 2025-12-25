"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";
import Stack from "@mui/material/Stack";
import Link from "next/link";

interface PostCardProps {
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  reverse?: boolean;
}

export default function PostCard({
  slug,
  title,
  excerpt,
  date,
  category,
  imageUrl,
  reverse = false,
}: PostCardProps) {
  const hasImage = Boolean(imageUrl);

  const cardContent = (
    <Card
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: hasImage ? (reverse ? "row-reverse" : "row") : "column",
        },
        height: { md: hasImage ? 280 : "auto" },
        overflow: "hidden",
        mb: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
      }}
    >
      {hasImage && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: "45%" },
            height: { xs: 200, md: "100%" },
            transition: "transform 0.5s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          image={imageUrl}
          alt={title}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: hasImage ? "55%" : "100%" },
          p: { xs: 2, md: 3 },
        }}
      >
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: "0 !important", md: hasImage ? "16px !important" : "0 !important" },
          }}
        >
          <Typography
            component="div"
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 500,
              letterSpacing: '0.05rem',
              "&:hover": { color: "primary.main" },
              transition: "color 0.3s",
              cursor: slug ? "pointer" : "default",
              mb: 1.5,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 2, color: "text.secondary", fontSize: "0.875rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon fontSize="small" />
              {date}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FolderIcon fontSize="small" />
              {category}
            </Box>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: hasImage ? 3 : 4,
              lineHeight: 1.8,
              mb: 2
            }}
          >
            {excerpt}
          </Typography>

          {slug && (
            <Box sx={{ mt: 'auto' }}>
              <Typography 
                variant="button" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  '&:after': {
                    content: '" →"',
                    ml: 0.5,
                    transition: 'margin-left 0.3s'
                  },
                  '&:hover:after': {
                    ml: 1
                  }
                }}
              >
                阅读全文
              </Typography>
            </Box>
          )}
        </CardContent>
      </Box>
    </Card>
  );

  if (slug) {
    return (
      <Link
        href={`/blog/${slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}


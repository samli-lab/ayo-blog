import * as React from "react";
import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MarkdownContent from "../../components/blog/MarkdownContent";
import BackButton from "../../components/blog/BackButton";
import { getPostBySlug as fetchPostBySlug, type PostDisplay } from "@/lib/api";

interface BlogPost extends PostDisplay {
  readTime?: string;
  imageUrl?: string;
  content: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await fetchPostBySlug(slug);
    
    if (!post || !post.content) {
      return {
        title: "文章未找到",
        description: "抱歉，您访问的文章不存在。",
      };
    }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const postUrl = `${siteUrl}/blog/${slug}`;

  // 从 content 中提取纯文本摘要（移除 Markdown 语法）
  const extractText = (text: string, maxLength: number = 160): string => {
    // 移除 Markdown 语法标记
    const plainText = text
      .replace(/#{1,6}\s+/g, "") // 移除标题标记
      .replace(/\*\*([^*]+)\*\*/g, "$1") // 移除粗体
      .replace(/\*([^*]+)\*/g, "$1") // 移除斜体
      .replace(/`([^`]+)`/g, "$1") // 移除行内代码
      .replace(/```[\s\S]*?```/g, "") // 移除代码块
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // 移除链接，保留文本
      .replace(/\n+/g, " ") // 替换换行为空格
      .trim();

    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

    const description = post.excerpt || extractText(post.content, 160);

    // 确保图片 URL 是绝对路径
    const getAbsoluteImageUrl = (imageUrl: string | undefined): string | undefined => {
      if (!imageUrl) return undefined;
      // 如果已经是绝对 URL，直接返回
      if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
      }
      // 如果是相对路径，转换为绝对路径
      return `${siteUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
    };

    const absoluteImageUrl = getAbsoluteImageUrl((post as BlogPost).imageUrl);

  return {
    title: post.title,
    description,
    keywords: [post.categoryName, "博客", "文章", "Sam's Blog", post.title, ...post.tags.map(tag => tag.name)],
    authors: [{ name: "Sam", url: siteUrl }],
    creator: "Sam",
    publisher: "Sam",
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: postUrl,
      siteName: "Sam's Blog",
      locale: "zh_CN",
      publishedTime: post.date,
      modifiedTime: post.date, // 如果有修改时间，可以替换
      authors: ["Sam"],
      section: post.categoryName,
      tags: [post.categoryName, "博客", "文章", ...post.tags.map(tag => tag.name)],
      images: absoluteImageUrl
        ? [
          {
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
            type: "image/jpeg", // 根据实际图片类型调整
          },
        ]
        : [
          // 如果没有文章图片，使用默认 OG 图片
          {
            url: `${siteUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: absoluteImageUrl ? [absoluteImageUrl] : [`${siteUrl}/og-image.jpg`],
      creator: "@your-twitter-handle", // 替换为实际的 Twitter 账号
      site: "@your-twitter-handle",
    },
    alternates: {
      canonical: postUrl,
    },
    // 添加其他有用的 meta 信息
    other: {
      "article:author": "Sam",
      "article:published_time": post.date,
      "article:section": post.categoryName,
      "article:tag": post.tags.map(tag => tag.name).join(", "),
    },
  };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "文章未找到",
      description: "抱歉，您访问的文章不存在。",
    };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  let error: string | null = null;

  try {
    const fetchedPost = await fetchPostBySlug(slug);
    if (fetchedPost && fetchedPost.content) {
      post = fetchedPost as BlogPost;
    }
  } catch (err) {
    console.error("Error fetching post:", err);
    error = err instanceof Error ? err.message : "获取文章失败";
  }

  if (!post) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: 10, sm: 12 },
          mb: 5,
          pt: 2,
          fontFamily: '"LXGW WenKai Screen", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif'
        }}
      >
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h4" gutterBottom>
            {error ? "加载文章失败" : "文章未找到"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {error || "抱歉，您访问的文章不存在。"}
          </Typography>
          <BackButton variant="contained" />
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 10, sm: 12 },
        mb: 5,
        pt: 2,
        fontFamily: '"LXGW WenKai Screen", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif'
      }}
    >
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <BackButton />
      </Box>

      {/* Article Card */}
      <Card sx={{ mb: 3 }}>
        {post.imageUrl && (
          <CardMedia
            component="img"
            image={post.imageUrl}
            alt={post.title}
            sx={{ 
              maxHeight: { xs: 300, sm: 400, md: 500 },
              width: '100%',
              objectFit: "cover",
              objectPosition: "top"
            }}
          />
        )}
        <Box sx={{ p: 4 }}>
          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, mb: 3 }}
          >
            {post.title}
          </Typography>

          {/* Meta Information */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ mb: 3, color: "text.secondary", flexWrap: "wrap" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">{post.date}</Typography>
            </Box>
            {post.categoryName && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FolderIcon fontSize="small" />
                <Typography variant="body2">{post.categoryName}</Typography>
              </Box>
            )}
            {post.readTime && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">{post.readTime}</Typography>
              </Box>
            )}
          </Stack>
          <Divider sx={{ mb: 4 }} />

          {/* Article Content */}
          <MarkdownContent content={post.content} />
        </Box>
      </Card>
    </Container>
  );
}


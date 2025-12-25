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

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  content: string;
  excerpt?: string;
}

// Mock Data - 在实际项目中应该从 API 获取
const getPostBySlug = (slug: string): BlogPost | null => {
  const posts: Record<string, BlogPost> = {
    "butterfly-5-5-release-notes": {
      id: 1,
      slug: "butterfly-5-5-release-notes",
      title: "Butterfly 5.5 Release Notes",
      date: "2025-09-09",
      category: "Release Notes",
      readTime: "5 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80",
      content: `# Butterfly 5.5 Release Notes

我们很高兴地宣布 Butterfly 5.5 版本的发布！这个版本包含了许多新功能和改进。

## 新功能

### 改进的懒加载过滤器

新的懒加载过滤器提供了更好的性能和用户体验。图片现在会在用户滚动到附近时才开始加载，大大减少了初始页面加载时间。

\`\`\`javascript
// 示例代码
const lazyLoad = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      lazyLoad.unobserve(img);
    }
  });
});
\`\`\`

### 本地搜索分页

本地搜索功能现在支持分页，让您可以更方便地浏览搜索结果。

### 按钮和侧边栏视觉更新

我们对按钮和侧边栏进行了视觉更新，使其更加现代化和美观。

## 性能优化

- 优化了图片加载策略
- 改进了代码分割
- 减少了不必要的重新渲染

## 修复的问题

- 修复了在某些浏览器中的样式问题
- 修复了搜索功能的 bug
- 改进了移动端的响应式布局

## 数学公式支持

现在支持使用 KaTeX 渲染数学公式：

$$
E = mc^2
$$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## 总结

Butterfly 5.5 是一个重要的更新，带来了许多新功能和改进。我们建议所有用户升级到这个版本。

感谢您的支持！`,
    },
    "getting-started-with-hexo-theme-butterfly": {
      id: 2,
      slug: "getting-started-with-hexo-theme-butterfly",
      title: "Getting Started with Hexo Theme Butterfly",
      date: "2025-05-28",
      category: "Docs",
      readTime: "10 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      content: `# Getting Started with Hexo Theme Butterfly

欢迎使用 Butterfly 主题！这是一个功能强大且美观的 Hexo 主题。

## 安装步骤

### 1. 安装 Hexo

首先，确保您已经安装了 Node.js，然后全局安装 Hexo：

\`\`\`bash
npm install -g hexo-cli
\`\`\`

### 2. 创建 Hexo 博客

\`\`\`bash
hexo init my-blog
cd my-blog
npm install
\`\`\`

### 3. 安装 Butterfly 主题

\`\`\`bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
\`\`\`

### 4. 配置主题

在 \`_config.yml\` 文件中设置主题：

\`\`\`yaml
theme: butterfly
\`\`\`

## 配置说明

### 基本信息配置

\`\`\`yaml
title: Your Blog Title
subtitle: Your Blog Subtitle
description: Your Blog Description
keywords: keyword1, keyword2
author: Your Name
\`\`\`

### 主题配置

Butterfly 主题提供了丰富的配置选项，您可以在 \`themes/butterfly/_config.yml\` 中进行配置。

## 开始写作

创建您的第一篇文章：

\`\`\`bash
hexo new post "My First Post"
\`\`\`

然后编辑 \`source/_posts/My-First-Post.md\` 文件。

## 部署

### 部署到 GitHub Pages

\`\`\`bash
npm install hexo-deployer-git --save
\`\`\`

在 \`_config.yml\` 中配置：

\`\`\`yaml
deploy:
  type: git
  repo: https://github.com/yourusername/yourusername.github.io.git
  branch: main
\`\`\`

然后运行：

\`\`\`bash
hexo clean
hexo generate
hexo deploy
\`\`\`

## 总结

现在您已经了解了如何开始使用 Butterfly 主题。更多详细信息，请查看官方文档。`,
    },
    "advanced-customization-tutorial": {
      id: 3,
      slug: "advanced-customization-tutorial",
      title: "Advanced Customization Tutorial",
      date: "2025-01-15",
      category: "Tutorial",
      readTime: "15 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80",
      content: `# Advanced Customization Tutorial

本教程将教您如何深度定制 Butterfly 主题。

## 自定义 CSS

您可以在 \`source/_data/styles.styl\` 文件中添加自定义样式：

\`\`\`stylus
// 自定义样式
.custom-class
  color: #49b1f5
  font-size: 16px
\`\`\`

## 修改布局

Butterfly 使用 EJS 模板，您可以在 \`themes/butterfly/layout\` 目录下找到所有模板文件。

### 修改头部

编辑 \`themes/butterfly/layout/includes/header/index.ejs\` 文件。

### 修改页脚

编辑 \`themes/butterfly/layout/includes/footer.ejs\` 文件。

## 添加第三方插件

### 添加评论系统

在 \`_config.butterfly.yml\` 中配置：

\`\`\`yaml
comments:
  use: valine
  valine:
    appId: your-app-id
    appKey: your-app-key
\`\`\`

### 添加统计代码

在 \`_config.butterfly.yml\` 中配置：

\`\`\`yaml
inject:
  head:
    - <script src="your-analytics-script.js"></script>
\`\`\`

## 自定义颜色主题

在 \`_config.butterfly.yml\` 中修改颜色配置：

\`\`\`yaml
theme_color:
  enable: true
  main: "#49b1f5"
  paginator: "#00c4b6"
  button_hover: "#ff7242"
\`\`\`

## 总结

通过这些高级定制技巧，您可以打造出独一无二的博客主题。`,
    },
    "markdown-syntax-guide": {
      id: 4,
      slug: "markdown-syntax-guide",
      title: "Markdown Syntax Guide",
      date: "2024-11-20",
      category: "Markdown",
      readTime: "8 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1673&q=80",
      content: `# Markdown Syntax Guide

Markdown 是一种轻量级标记语言，非常适合写作。

## 标题

\`\`\`markdown
# 一级标题
## 二级标题
### 三级标题
\`\`\`

## 文本样式

- **粗体文本**
- *斜体文本*
- ~~删除线~~
- \`行内代码\`

## 列表

### 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

### 有序列表

1. 第一项
2. 第二项
3. 第三项

## 链接和图片

[链接文本](https://example.com)

![图片描述](https://example.com/image.jpg)

## 代码块

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

## 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

## 引用

> 这是一段引用文本。
> 可以包含多行。

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

## 总结

掌握这些 Markdown 语法，您就可以写出格式优美的文章了！`,
    },
    "gallery-feature-showcase": {
      id: 5,
      slug: "gallery-feature-showcase",
      title: "Gallery Feature Showcase",
      date: "2024-08-05",
      category: "Gallery",
      readTime: "6 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&auto=format&fit=crop&w=1803&q=80",
      content: `# Gallery Feature Showcase

Butterfly 主题提供了强大的图片画廊功能。

## 基本用法

使用 \`gallery\` 标签来创建图片画廊：

\`\`\`markdown
{% gallery %}
![图片1](url1)
![图片2](url2)
![图片3](url3)
{% endgallery %}
\`\`\`

## 网格布局

画廊支持多种布局方式：

- 网格布局
- 瀑布流布局
- 幻灯片布局

## 响应式设计

画廊会自动适配不同屏幕尺寸，在移动设备上也能完美显示。

## 总结

使用画廊功能，您可以轻松展示您的摄影作品。`,
    },
  };

  return posts[slug] || null;
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
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

  const description = extractText(post.content, 160);

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

  const absoluteImageUrl = getAbsoluteImageUrl(post.imageUrl);

  return {
    title: post.title,
    description,
    keywords: [post.category, "博客", "文章", "Sam's Blog", post.title],
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
      section: post.category,
      tags: [post.category, "博客", "文章"],
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
      "article:section": post.category,
      "article:tag": post.category,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ mt: { xs: 10, sm: 12 }, mb: 5, pt: 2 }}>
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h4" gutterBottom>
            文章未找到
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            抱歉，您访问的文章不存在。
          </Typography>
          <BackButton variant="contained" />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 10, sm: 12 }, mb: 5, pt: 2 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <BackButton />
      </Box>

      {/* Article Card */}
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={post.imageUrl}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FolderIcon fontSize="small" />
              <Typography variant="body2">{post.category}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{post.readTime}</Typography>
            </Box>
          </Stack>
          <Divider sx={{ mb: 4 }} />

          {/* Article Content */}
          <MarkdownContent content={post.content} />
        </Box>
      </Card>
    </Container>
  );
}


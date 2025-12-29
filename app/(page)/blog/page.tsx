'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const posts = [
  {
    id: 1,
    slug: "butterfly-5-5-release-notes",
    title: "Butterfly 5.5 发行说明",
    excerpt: "这一次更新，我们重新思考了性能与美学的平衡。不仅优化了延迟加载算法，更在细节上打磨了每一处交互。",
    date: "09.09",
    year: "2025",
    category: "更新日志"
  },
  {
    id: 2,
    slug: "getting-started-with-hexo-theme-butterfly",
    title: "与 Butterfly 的初次相遇",
    excerpt: "从安装到配置，这不仅仅是一份技术指南，更是一场关于如何搭建个人精神家园的探索旅程。",
    date: "05.28",
    year: "2025",
    category: "指南"
  },
  {
    id: 3,
    slug: "advanced-customization-tutorial",
    title: "进阶：打造独一无二的博客",
    excerpt: "深入 CSS 的世界，通过自定义样式和插件，让你的文字在指尖跳舞，展现出最真实的自我。",
    date: "01.15",
    year: "2025",
    category: "教程"
  },
  {
    id: 4,
    slug: "markdown-syntax-guide",
    title: "Markdown：文字的律动",
    excerpt: "掌握简单的语法，让写作回归本质。在这里，我们探讨如何利用 Markdown 构建清晰、有力的表达。",
    date: "11.20",
    year: "2024",
    category: "写作"
  },
  {
    id: 5,
    slug: "gallery-feature-showcase",
    title: "光影之美：图库功能详解",
    excerpt: "照片是时光的切片。学习如何利用全新的瀑布流布局，展示那些让你心动的每一个瞬间。",
    date: "08.05",
    year: "2024",
    category: "摄影"
  }
];

export default function BlogListPage() {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 15, md: 22 }, mb: 20 }}>
      {/* 极简页眉 */}
      <Box sx={{ mb: { xs: 10, md: 15 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 200,
            letterSpacing: '-0.05em',
            color: 'text.primary',
            mb: 2
          }}
        >
          Journal<Box component="span" sx={{ color: 'primary.main' }}>.</Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            letterSpacing: '0.15rem',
            fontSize: '0.9rem',
            opacity: 0.7
          }}
        >
          笔尖划过岁月的痕迹，记录思考的余温
        </Typography>
      </Box>

      {/* 列表主体 */}
      <Box sx={{ position: 'relative' }}>
        {/* 时间中轴线 (可选) */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 0, md: -40 },
            top: 0,
            bottom: 0,
            width: '1px',
            bgcolor: 'divider',
            opacity: 0.5,
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Stack spacing={12}>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    group: 'true',
                    cursor: 'pointer',
                    '&:hover .post-title': { color: 'primary.main', transform: 'translateX(10px)' },
                    '&:hover .post-line': { width: '40px', bgcolor: 'primary.main' }
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 2, md: 6 }}
                    alignItems="flex-start"
                  >
                    {/* 日期栏 */}
                    <Box sx={{ minWidth: '80px', pt: 0.5 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 300,
                          color: 'text.secondary',
                          fontSize: '1.2rem'
                        }}
                      >
                        {post.date}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.disabled',
                          letterSpacing: '0.1em'
                        }}
                      >
                        {post.year}
                      </Typography>
                    </Box>

                    {/* 内容栏 */}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        className="post-line"
                        sx={{
                          width: '20px',
                          height: '2px',
                          bgcolor: 'divider',
                          mb: 2,
                          transition: 'all 0.4s ease'
                        }}
                      />
                      <Typography
                        className="post-title"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          color: 'text.primary',
                          mb: 2,
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          transition: 'all 0.4s ease',
                          lineHeight: 1.3
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 2,
                          fontSize: '1.05rem',
                          textAlign: 'justify',
                          maxWidth: '650px',
                          opacity: 0.8
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      <Box sx={{ mt: 3 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                          }}
                        >
                          # {post.category}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Link>
            </motion.div>
          ))}
        </Stack>
      </Box>

      {/* 极简底部 */}
      <Box sx={{ mt: 20, textAlign: 'center', opacity: 0.3 }}>
        <Typography variant="body2" sx={{ letterSpacing: '0.2rem' }}>
          THE END OF LIST
        </Typography>
      </Box>
    </Container>
  );
}

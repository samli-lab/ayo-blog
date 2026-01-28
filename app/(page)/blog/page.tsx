'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';
import { getPosts, type PostDisplay } from '@/lib/api';

export default function BlogListPage() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取文章列表时发生错误');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 15, md: 22 }, mb: 20 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 15, md: 22 }, mb: 20 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
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
                          # {post.categoryName}
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

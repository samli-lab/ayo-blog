'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { getPhotosWithPagination, type Photo, type Pagination } from '@/lib/api';

// 渐入动画
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function GalleryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const columnCount = isMobile ? 1 : isTablet ? 2 : 3;

  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [pagination, setPagination] = React.useState<Pagination | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedImg, setSelectedImg] = React.useState<string | null>(null);
  const [imageErrors, setImageErrors] = React.useState<Set<string>>(new Set());

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px', // 提前 100px 触发加载，提升体验
  });

  const fetchPhotos = React.useCallback(async (page: number = 1, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const resData = await getPhotosWithPagination(page, 12);

      if (isLoadMore) {
        setPhotos(prev => {
          // 简单的去重逻辑，防止因网络抖动等原因导致数据重复
          const newPhotos = resData.photos.filter(
            p => !prev.find(existing => existing.id === p.id)
          );
          return [...prev, ...newPhotos];
        });
      } else {
        setPhotos(resData.photos);
      }
      setPagination(resData.pagination);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
      const errorMessage = error instanceof Error ? error.message : '加载照片失败，请检查网络连接后重试';
      if (!isLoadMore) {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const handleImageError = (photoId: string) => {
    setImageErrors(prev => new Set(prev).add(photoId));
  };

  React.useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  // 监听滚动到触发点
  React.useEffect(() => {
    if (inView && !loading && !loadingMore && pagination && pagination.page < pagination.totalPages) {
      fetchPhotos(pagination.page + 1, true);
    }
  }, [inView, loading, loadingMore, pagination, fetchPhotos]);

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 12, md: 16 }, mb: { xs: 10, md: 15 }, animation: `${fadeIn} 1.2s ease-out` }}>
      {/* 头部标题区 */}
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            letterSpacing: '0.8rem',
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            textTransform: 'uppercase'
          }}
        >
          光影 · 留存
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', opacity: 0.8, letterSpacing: '0.3rem', mb: 4 }}>
          记录那些转瞬即逝的美好瞬间
        </Typography>
        <Divider sx={{ width: '80px', height: '2px', bgcolor: 'primary.main', mx: 'auto', opacity: 0.5 }} />
      </Box>

      {/* 照片墙主体 - 采用 Grid + Stack 布局，确保新加载内容不影响已有布局 */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: { xs: 8, md: 10 },
          px: 2
        }}>
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: { xs: 48, md: 64 }, 
              color: 'error.main', 
              mb: 2,
              opacity: 0.8
            }} 
          />
          <Typography 
            variant="h6" 
            color="error" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 500
            }}
          >
            加载失败
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 3, 
              textAlign: 'center',
              maxWidth: '400px',
              fontSize: { xs: '0.875rem', md: '1rem' },
              lineHeight: 1.6
            }}
          >
            {error}
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => fetchPhotos(1)}
            sx={{ 
              mt: 2,
              px: 3,
              py: 1
            }}
          >
            重试
          </Button>
        </Box>
      ) : photos.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <Typography variant="body1" color="text.secondary">
            暂无照片
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
            width: '100%',
            alignItems: 'start'
          }}>
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <Stack
                key={colIndex}
                spacing={3}
              >
                {photos
                  .filter((_, idx) => idx % columnCount === colIndex)
                  .map((photo) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Box
                        onClick={() => setSelectedImg(photo.url)}
                        sx={{
                          position: 'relative',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'zoom-in',
                          backgroundColor: 'background.paper',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'scale(1.02) translateY(-5px)',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                            '& .overlay': {
                              opacity: 1,
                              '& .text-content': {
                                transform: 'translateY(0)',
                                opacity: 1
                              }
                            }
                          }
                        }}
                      >
                        {/* 图片 */}
                        {imageErrors.has(photo.id) ? (
                          <Box
                            sx={{
                              width: '100%',
                              minHeight: '200px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'grey.100',
                              color: 'text.secondary'
                            }}
                          >
                            <Typography variant="body2" sx={{ textAlign: 'center', p: 2 }}>
                              图片加载失败
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            component="img"
                            src={photo.url}
                            alt={photo.title}
                            onError={() => handleImageError(photo.id)}
                            sx={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              minHeight: '150px'
                            }}
                          />
                        )}

                        {/* 悬停信息层 */}
                        <Box
                          className="overlay"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            p: 3,
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                            color: '#fff',
                            willChange: 'opacity',
                            pointerEvents: 'none'
                          }}
                        >
                          <Box
                            className="text-content"
                            sx={{
                              transform: 'translateY(10px)',
                              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              opacity: 0,
                              willChange: 'transform, opacity',
                              width: '100%'
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                              {photo.title}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 300, fontSize: '0.9rem' }}>
                              {photo.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
              </Stack>
            ))}
          </Box>

          {/* 滚动触发点和加载动画 */}
          <Box
            ref={ref}
            sx={{
              textAlign: 'center',
              mt: 6,
              mb: 4,
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              opacity: 0.7
            }}
          >
            {loadingMore ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CircularProgress size={20} color="inherit" />
                <Typography variant="body2">正在加载更多美好...</Typography>
              </Box>
            ) : (
              pagination && pagination.page >= pagination.totalPages && photos.length > 0 && (
                <Typography variant="body2" sx={{ letterSpacing: '0.1rem' }}>
                  — 已经到底啦，期待更多瞬间 —
                </Typography>
              )
            )}
          </Box>
        </>
      )}

      {/* 灯箱效果 (Lightbox) */}
      <AnimatePresence>
        {selectedImg && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              bgcolor: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              p: { xs: 2, md: 4 },
              cursor: 'zoom-out'
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: '#fff',
                bgcolor: 'rgba(255,255,255,0.1)',
                zIndex: 2001,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              component={motion.img}
              src={selectedImg}
              onClick={(e) => e.stopPropagation()} // 点击图片本身不关闭，或者你希望点击图片也关闭？通常是点击背景关闭。
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              sx={{
                maxWidth: '95%',
                maxHeight: '95%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                cursor: 'default'
              }}
            />
          </Box>
        )}
      </AnimatePresence>

      {/* 底部语录 */}
      <Box sx={{ textAlign: 'center', mt: 15, opacity: 0.6 }}>
        <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            maxWidth: '500px',
            mx: 'auto',
            lineHeight: 2,
            letterSpacing: '0.1rem'
          }}
        >
          “每一张照片，都是时光的一个切片，
          <br />
          它们在无声中诉说着，那些关于热爱的故事。”
        </Typography>
      </Box>
    </Container>
  );
}


'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 12, md: 16 }, mb: { xs: 10, md: 15 }, animation: `${fadeIn} 1s ease-out` }}>
      {/* 标题部分 */}
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 300,
            letterSpacing: '0.6rem',
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          关于 · 溯源
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', opacity: 0.8, letterSpacing: '0.2rem' }}>
          一段关于时间、文字与重构的旅程
        </Typography>
        <Divider sx={{ width: '60px', height: '3px', bgcolor: 'primary.main', mx: 'auto', mt: 4, opacity: 0.6 }} />
      </Box>

      <Stack spacing={12}>
        {/* 1. 起源部分 */}
        <Box>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ width: '4px', height: '24px', bgcolor: 'primary.main', mr: 2, borderRadius: 1 }} />
            回响：2016
          </Typography>
          <Typography paragraph sx={{ lineHeight: 2, fontSize: '1.1rem', color: 'text.primary', textAlign: 'justify' }}>
            2016 年 1 月 3 日，我折腾的第一个博客正式上线了，最开始用的是 <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>lidashan.cc</Box>这个域名。
          </Typography>
          <Typography paragraph sx={{ lineHeight: 2, fontSize: '1.1rem', color: 'text.primary', textAlign: 'justify' }}>
            那时候刚忙完一个挺耗精力的商城项目，整个人还处在那种“技术兴奋期”，就想干脆自己写套博客系统，把学到的东西、踩过的坑都记下来。当时也没想太多以后，就是觉得有个能自己说了算的“小窝”挺酷的。
          </Typography>
          <Typography paragraph sx={{ lineHeight: 2, fontSize: '1.1rem', color: 'text.primary', textAlign: 'justify' }}>
            后来，或许真的是冥冥之中的天意，我竟意外地先后购得了 <Box component="span" sx={{ fontWeight: 500 }}>lidashan.com</Box> 和 <Box component="span" sx={{ fontWeight: 500 }}>lidashan.cn</Box> 的同名域名（之前这两个域名都被别人注册了）。
          </Typography>
          <Typography paragraph sx={{ lineHeight: 2, fontSize: '1.1rem', color: 'text.primary', textAlign: 'justify' }}>
            从那时起，这几个域名就成了我这些年在互联网上的坐标。期间我也换过不少技术栈，每一次折腾其实都是一次自我沉淀。虽然中间因为工作忙碌，这里更新得慢了些。对我来说，这不仅是一个展示技术的窗口，更像是一个存放时光的抽屉。
          </Typography>

        </Box>

        {/* 2. 记忆卡片（微信朋友圈内容） */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper
            elevation={0}
            onClick={() => window.open('/images/about/image.png', '_blank')}
            sx={{
              maxWidth: { xs: '280px', md: '320px' },
              width: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'zoom-in',
              transition: 'all 0.3s ease',
              border: '1px solid',
              borderColor: 'divider',
              p: 1,
              bgcolor: 'background.paper',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                borderColor: 'primary.main'
              }
            }}
          >
            <Box
              component="img"
              src="/images/about/image.png"
              alt="2016年朋友圈记忆"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '4px'
              }}
            />
          </Paper>
          <Typography
            variant="caption"
            sx={{
              mt: 2,
              color: 'text.secondary',
              opacity: 0.8,
              fontStyle: 'italic',
              letterSpacing: '0.05rem'
            }}
          >
            — 摘自 2016 年的一条朋友圈状态
          </Typography>
        </Box>

        {/* 3. 重塑部分：AI 与未来 */}
        <Box>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ width: '4px', height: '24px', bgcolor: 'primary.main', mr: 2, borderRadius: 1 }} />
            新生：AI 重构
          </Typography>
          <Typography paragraph sx={{ lineHeight: 2, fontSize: '1.1rem', color: 'text.primary', textAlign: 'justify' }}>
            转眼到了 2025 年，技术的世界翻篇太快。这一次，我决定做一个尝试：让这个博客 100% 由 AI 重构。
          </Typography>

          <Typography paragraph sx={{ lineHeight: 2, fontSize: '1.1rem', color: 'text.primary', textAlign: 'justify' }}>
            这不再是传统的“敲代码”，而更像是一场持续不断的“跨时空对话”。我只负责给出审美倾向和逻辑骨架，而 AI 则负责把这些想法变成真实的、可运行的像素。这个过程虽然没有了指尖敲击键盘的快感，却多了一种像是在指挥乐团的奇妙体验。
          </Typography>
        </Box>

        {/* 4. 期许部分 */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              lineHeight: 2.5,
              color: 'text.primary',
              maxWidth: '600px',
              mx: 'auto',
              fontStyle: 'italic'
            }}
          >
            “我们记录，不是为了对抗遗忘，
            <br />
            而是为了在未来的某个时刻，
            <br />
            能与那个曾经热烈生活过的自己，久别重逢。”
          </Typography>
          <Typography sx={{ mt: 6, color: 'primary.main', letterSpacing: '0.3rem', fontWeight: 500 }}>
            {new Date().getFullYear()} · 步履不停
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}


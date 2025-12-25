'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Hero from './components/index/Hero';

// 打字机效果的 Hook
function useTypewriter(texts: string[], speed: number = 50, delay: number = 0) {
  const [displayedTexts, setDisplayedTexts] = React.useState<string[]>(texts.map(() => ''));
  const [isTyping, setIsTyping] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

  const startTyping = React.useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    setIsTyping(true);
    setCurrentTextIndex(0);

    let textIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (textIndex >= texts.length) {
        setIsTyping(false);
        return;
      }

      const currentText = texts[textIndex];
      if (charIndex < currentText.length) {
        setDisplayedTexts(prev => {
          const newTexts = [...prev];
          newTexts[textIndex] = currentText.slice(0, charIndex + 1);
          return newTexts;
        });
        setCurrentTextIndex(textIndex);
        charIndex++;
        setTimeout(typeNextChar, speed);
      } else {
        // 当前文本完成，开始下一个文本
        textIndex++;
        setCurrentTextIndex(textIndex);
        charIndex = 0;
        // 段落之间的延迟
        setTimeout(typeNextChar, delay);
      }
    };

    setTimeout(typeNextChar, delay);
  }, [texts, speed, delay, hasStarted]);

  return { displayedTexts, isTyping, currentTextIndex, startTyping };
}

export default function HomePage() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [shouldStartTyping, setShouldStartTyping] = React.useState(false);

  // 文本内容
  const titleText = '岁月的痕迹 · 内心的独白';
  const paragraphTexts = [
    '在这个信息洪流裹挟一切的时代，文字似乎变得奢侈。',
    '我们习惯了指尖在屏幕上的飞速滑动，却往往忘记了停下来，听一听内心深处最真实的声音。',
    '这里是我为自己——也为每一个偶然路过的你——搭建的一处小小角落。',
    '它不追求所谓的"热点"，不迎合任何喧嚣，只愿能真实地记录下生活中的点滴思考，以及那些在忙碌缝隙中闪现的感悟。',
    '或许是一段技术方案的推敲过程，或许是一场关于远方旅行的零散记忆，亦或是某个深夜突然涌入脑海的只言片语。',
    '文字在这里化作经纬，编织出一段属于我的时空印记。',
    '愿你在这里能感受到一丝宁静，愿这些文字能带给你些许共鸣。',
    '凡是过往，皆为序章；凡是未来，皆有期许。',
    '万物皆有裂痕，那是光照进来的地方。'
  ];

  const titleTypewriter = useTypewriter([titleText], 30, 0);
  const paragraphTypewriter = useTypewriter(paragraphTexts, 30, 500);

  // 监听滚动事件和 Intersection Observer
  React.useEffect(() => {
    if (!contentRef.current || shouldStartTyping) return;

    const handleScroll = () => {
      if (contentRef.current && !shouldStartTyping) {
        const rect = contentRef.current.getBoundingClientRect();
        // 当内容区域进入视口时触发
        if (rect.top < window.innerHeight * 0.8) {
          setShouldStartTyping(true);
        }
      }
    };

    // 使用 Intersection Observer 更可靠地检测元素进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldStartTyping) {
            setShouldStartTyping(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-20% 0px'
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // 初始检查（如果页面已经滚动到内容区域）
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [shouldStartTyping]);

  // 监听下滑按钮点击和滚动，触发打字机效果
  React.useEffect(() => {
    if (shouldStartTyping) {
      titleTypewriter.startTyping();
      // 标题显示完成后开始段落
      const timer = setTimeout(() => {
        paragraphTypewriter.startTyping();
      }, titleText.length * 80 + 500);
      return () => clearTimeout(timer);
    }
  }, [shouldStartTyping, titleTypewriter, paragraphTypewriter]);

  return (
    <>
      <Hero />
      <Container maxWidth="md" sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 10, md: 15 } }}>
        {/* 核心排版容器 */}
        <Box
          ref={contentRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 6, md: 8 }
          }}
        >

          {/* 第一段：引子 */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 300,
                letterSpacing: '0.4rem',
                color: 'primary.main',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2.2rem' },
                minHeight: { xs: '3rem', md: '4rem' }
              }}
            >
              {titleTypewriter.displayedTexts[0]}
              {titleTypewriter.isTyping && titleTypewriter.currentTextIndex === 0 && (
                <Box
                  component="span"
                  sx={{
                    ml: 0.5,
                    animation: 'blink 1s infinite',
                    '@keyframes blink': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0 }
                    }
                  }}
                >
                  |
                </Box>
              )}
            </Typography>
            <Divider sx={{ width: '40px', height: '2px', bgcolor: 'primary.main', mx: 'auto', opacity: 0.6 }} />
          </Box>

          {/* 正文段落：优雅的间距与行高 */}
          <Box sx={{
            width: '100%',
            maxWidth: '700px',
            color: 'text.primary',
            lineHeight: 2.0,
            fontSize: { xs: '1.05rem', md: '1.15rem' },
            textAlign: 'justify',
            '& p': { mb: 2.5, letterSpacing: '0.05rem', minHeight: '3em', lineHeight: 2.0 }
          }}>
            {paragraphTexts.slice(0, paragraphTexts.length - 1).map((_, index) => (
              <Typography key={index} paragraph sx={{ lineHeight: 2.0 }}>
                {paragraphTypewriter.displayedTexts[index]}
                {paragraphTypewriter.isTyping &&
                  paragraphTypewriter.currentTextIndex === index &&
                  paragraphTypewriter.displayedTexts[index].length < paragraphTexts[index].length && (
                    <Box
                      component="span"
                      sx={{
                        ml: 0.5,
                        animation: 'blink 1s infinite',
                        '@keyframes blink': {
                          '0%, 100%': { opacity: 1 },
                          '50%': { opacity: 0 }
                        }
                      }}
                    >
                      |
                    </Box>
                  )}
              </Typography>
            ))}
          </Box>

          {/* 结尾签名感设计 */}
          <Box sx={{
            alignSelf: 'flex-end',
            textAlign: 'right',
            mt: 4,
            opacity: 0.8,
            borderRight: paragraphTypewriter.displayedTexts[paragraphTexts.length - 1].length > 0 ? '2px solid' : 'none',
            borderColor: 'primary.main',
            pr: 2,
            minHeight: '2em',
            transition: 'border-right 0.3s ease-in-out'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5, lineHeight: 2.0 }}>
              {paragraphTypewriter.displayedTexts[paragraphTexts.length - 1]}
              {paragraphTypewriter.isTyping &&
                paragraphTypewriter.currentTextIndex === paragraphTexts.length - 1 &&
                paragraphTypewriter.displayedTexts[paragraphTexts.length - 1].length < paragraphTexts[paragraphTexts.length - 1].length && (
                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0 }
                      }
                    }}
                  >
                    |
                  </Box>
                )}
            </Typography>
          </Box>

        </Box>
      </Container>
    </>
  );
}

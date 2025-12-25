import ThemeRegistry from './ThemeRegistry';
import Navbar from './components/index/Navbar';
import Footer from './components/index/Footer';
import Box from '@mui/material/Box';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "首页",
  description: "Sam's Blog - 记录生活，分享思考。一个现代化的个人博客，包含技术文章、生活随笔和思考记录。",
  keywords: ["博客首页", "个人博客", "技术博客", "生活记录", "Sam's Blog"],
  openGraph: {
    title: "Sam's Blog - 记录生活，分享思考",
    description: "一个现代化的个人博客，包含技术文章、生活随笔和思考记录",
    type: "website",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeRegistry>
  );
}


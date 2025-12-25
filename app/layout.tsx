import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"),
  title: {
    default: "Sam's Blog - 记录生活，分享思考",
    template: "%s | Sam's Blog",
  },
  description: "一个记录生活、分享思考的个人博客，包含文章、时光记录、照片墙和留言板",
  keywords: ["博客", "个人博客", "技术博客", "生活记录", "Sam's Blog", "技术分享", "生活随笔"],
  authors: [{ name: "Sam", url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com" }],
  creator: "Sam",
  publisher: "Sam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "Sam's Blog",
    title: "Sam's Blog - 记录生活，分享思考",
    description: "一个记录生活、分享思考的个人博客，包含文章、时光记录、照片墙和留言板",
    images: [
      {
        url: "/og-image.jpg", // 需要添加实际的 OG 图片
        width: 1200,
        height: 630,
        alt: "Sam's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam's Blog - 记录生活，分享思考",
    description: "一个记录生活、分享思考的个人博客",
    images: ["/og-image.jpg"],
    creator: "@your-twitter-handle", // 替换为实际的 Twitter 账号
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "/",
  },
  category: "blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkai/dist/lxgwwenkai-light/result.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

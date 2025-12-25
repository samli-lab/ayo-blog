import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客文章列表",
  description: "浏览所有博客文章，包括技术分享、生活随笔、开发教程等内容。",
  keywords: ["博客文章", "技术文章", "文章列表", "博客", "Sam's Blog"],
  openGraph: {
    title: "博客文章列表 | Sam's Blog",
    description: "浏览所有博客文章，包括技术分享、生活随笔、开发教程等内容",
    type: "website",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


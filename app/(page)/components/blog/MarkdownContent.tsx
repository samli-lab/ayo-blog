"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";
import { Box } from "@mui/material";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <Box
      sx={{
        fontFamily: '"LXGW WenKai Screen", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
        maxWidth: "800px",
        mx: "auto",
        color: "text.primary",
        fontSize: { xs: "1.05rem", md: "1.125rem" },
        lineHeight: 1.9,
        letterSpacing: "0.02em",

        // 标题样式
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontWeight: 700,
          lineHeight: 1.4,
          color: "text.primary",
          mt: { xs: 3, md: 4 },
          mb: { xs: 2, md: 2.5 },
          letterSpacing: "0.01em",
        },
        "& h1": {
          fontSize: { xs: "2rem", md: "2.5rem" },
          mt: { xs: 2, md: 3 },
        },
        "& h2": {
          fontSize: { xs: "1.75rem", md: "2rem" },
          mt: { xs: 3, md: 4 },
          mb: { xs: 1.5, md: 2 },
        },
        "& h3": {
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          mt: { xs: 2.5, md: 3.5 },
        },
        "& h4": {
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          mt: { xs: 2, md: 3 },
        },

        // 段落样式
        "& p": {
          mb: { xs: 2, md: 2.5 },
          color: "text.primary",
          lineHeight: 1.9,
          textAlign: "justify",
          wordBreak: "break-word",
        },

        // 列表样式
        "& ul, & ol": {
          mb: { xs: 2, md: 2.5 },
          pl: { xs: 3, md: 4 },
          lineHeight: 1.9,
        },
        "& li": {
          mb: { xs: 1, md: 1.5 },
          lineHeight: 1.9,
        },
        "& li > p": {
          mb: { xs: 0.5, md: 1 },
        },

        // 引用块样式
        "& blockquote": {
          borderLeft: "4px solid",
          borderColor: "primary.main",
          pl: { xs: 2, md: 3 },
          pr: { xs: 1, md: 2 },
          py: { xs: 1.5, md: 2 },
          my: { xs: 2, md: 3 },
          backgroundColor: "action.hover",
          fontStyle: "italic",
          borderRadius: "0 4px 4px 0",
          lineHeight: 1.9,
          "& p": {
            mb: 1,
          },
        },

        // 行内代码样式
        "& code": {
          backgroundColor: "action.hover",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: "0.9em",
          fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
          color: "primary.main",
          fontWeight: 500,
        },

        // 代码块样式
        "& pre": {
          backgroundColor: "#1e1e1e",
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          overflow: "auto",
          my: { xs: 2, md: 3 },
          lineHeight: 1.6,
          "& code": {
            backgroundColor: "transparent",
            color: "#d4d4d4",
            padding: 0,
            fontWeight: 400,
          },
        },

        // 链接样式
        "& a": {
          color: "primary.main",
          textDecoration: "none",
          borderBottom: "1px solid transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            borderBottom: "1px solid",
            borderColor: "primary.main",
          },
        },

        // 图片样式
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
          my: { xs: 2, md: 3 },
          display: "block",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },

        // 分隔线样式
        "& hr": {
          border: "none",
          height: "1px",
          backgroundColor: "divider",
          my: { xs: 3, md: 4 },
        },

        // 表格样式
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          my: { xs: 2, md: 3 },
          fontSize: "0.95em",
          lineHeight: 1.8,
          "& th, & td": {
            border: "1px solid",
            borderColor: "divider",
            px: { xs: 1.5, md: 2 },
            py: { xs: 1, md: 1.5 },
            textAlign: "left",
          },
          "& th": {
            backgroundColor: "action.hover",
            fontWeight: 700,
          },
          "& tr:nth-of-type(even)": {
            backgroundColor: "action.hover",
          },
        },

        // 强调文本
        "& strong": {
          fontWeight: 700,
          color: "text.primary",
        },
        "& em": {
          fontStyle: "italic",
          color: "text.secondary",
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            // 如果有语言匹配，说明是代码块；否则是内联代码
            return match ? (
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}


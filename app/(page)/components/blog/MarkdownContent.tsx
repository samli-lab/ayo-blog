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
        "& .prose": {
          color: "text.primary",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          "& h1, & h2, & h3, & h4, & h5, & h6": {
            fontWeight: 700,
            mt: 4,
            mb: 2,
            color: "text.primary",
          },
          "& h1": { fontSize: "2.5rem" },
          "& h2": { fontSize: "2rem" },
          "& h3": { fontSize: "1.75rem" },
          "& h4": { fontSize: "1.5rem" },
          "& p": {
            mb: 2,
            color: "text.primary",
          },
          "& ul, & ol": {
            mb: 2,
            pl: 3,
          },
          "& li": {
            mb: 1,
          },
          "& blockquote": {
            borderLeft: "4px solid",
            borderColor: "primary.main",
            pl: 2,
            py: 1,
            my: 2,
            backgroundColor: "action.hover",
            fontStyle: "italic",
          },
          "& code": {
            backgroundColor: "action.hover",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.9em",
            fontFamily: "monospace",
          },
          "& pre": {
            backgroundColor: "#1e1e1e",
            borderRadius: 2,
            p: 2,
            overflow: "auto",
            mb: 2,
            "& code": {
              backgroundColor: "transparent",
              color: "#d4d4d4",
              padding: 0,
            },
          },
          "& a": {
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          "& img": {
            maxWidth: "100%",
            height: "auto",
            borderRadius: 2,
            my: 2,
          },
          "& table": {
            width: "100%",
            borderCollapse: "collapse",
            mb: 2,
            "& th, & td": {
              border: "1px solid",
              borderColor: "divider",
              px: 2,
              py: 1,
            },
            "& th": {
              backgroundColor: "action.hover",
              fontWeight: 700,
            },
          },
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
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


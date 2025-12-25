# Sam's Blog

一个使用 Next.js 16 构建的个人博客网站。

## 功能特性

- 📝 文章列表和详情页
- 📅 时光记录
- 📸 照片墙
- 💬 留言板
- ✨ 现代化的 UI 设计
- 🎨 支持 Markdown 格式文章展示

## 技术栈

- **框架**: Next.js 16
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **Markdown**: react-markdown + react-syntax-highlighter

## 安装依赖

```bash
npm install
# 或
pnpm install
```

## 安装 Markdown 相关依赖

```bash
npm install react-markdown remark-gfm react-syntax-highlighter @types/react-syntax-highlighter
```

## 开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 构建

```bash
npm run build
```

## 项目结构

```
app/
├── (blog)/              # Route Group
│   ├── page.tsx        # 首页
│   ├── blog/           # 博客相关页面
│   │   ├── page.tsx    # 文章列表
│   │   └── [slug]/     # 文章详情页（动态路由）
│   ├── timeline/       # 时光记录
│   ├── gallery/        # 照片墙
│   └── guestbook/      # 留言板
├── components/         # 共享组件
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── MarkdownContent.tsx  # Markdown 渲染组件
└── layout.tsx          # 根布局
```

## 博客文章 API

文章详情页 (`/blog/[slug]`) 需要从后端获取数据。在 `app/(blog)/blog/[slug]/page.tsx` 中的 `getPost` 函数中修改 API 调用：

```typescript
async function getPost(slug: string) {
  const res = await fetch(`your-api-url/posts/${slug}`);
  return res.json();
}
```

后端返回的数据格式应该包含：
- `title`: 文章标题
- `date`: 发布日期
- `category`: 分类
- `readTime`: 阅读时间
- `content`: Markdown 格式的文章内容

## 样式说明

- 使用了优雅的中文字体栈，确保在不同系统上都有良好的显示效果
- Markdown 内容使用了优化的字体大小和行高，提升阅读体验
- 代码块使用了语法高亮，支持多种编程语言

## License

MIT

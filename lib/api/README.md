# API 服务管理

本目录用于统一管理所有 API 请求服务。

## 目录结构

```
lib/api/
├── README.md          # API 服务文档
├── config.ts          # API 配置（基础 URL、超时等）
├── client.ts          # 统一的 API 请求客户端
├── posts.ts           # 文章相关 API
├── gallery.ts         # 图库相关 API
└── index.ts           # 统一导出入口
```

## 环境变量配置

### 1. 创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件：

```bash
# API 基础 URL 配置
# 如果你的 API 在不同的域名或端口，请在这里配置完整的基础 URL
# 例如: NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
# 如果 API 和前端在同一个服务器，可以留空或设置为空字符串
NEXT_PUBLIC_API_BASE_URL=
```

### 2. 不同环境的配置示例

**开发环境（API 在不同端口）：**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**生产环境（API 在不同域名）：**
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

**同域部署（API 和前端在同一服务器）：**
```bash
NEXT_PUBLIC_API_BASE_URL=
```

## API 响应格式

### 标准响应结构

后端 API 返回的标准格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 实际数据在这里
  }
}
```

`apiClient` 会自动处理这种响应格式：
- 检查 `code` 是否为 200
- 如果失败，抛出包含 `message` 的错误
- 如果成功，返回 `data` 字段的内容

### 文章列表响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "posts": [
      {
        "id": "uuid-string",
        "slug": "article-slug",
        "title": "文章标题",
        "excerpt": "文章摘要",
        "date": "2026-01-28",
        "category": {
          "id": "uuid-string",
          "name": "分类名称"
        },
        "tags": [
          {
            "id": "uuid-string",
            "name": "标签名称"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 6,
      "total": 10,
      "totalPages": 2
    }
  }
}
```

### 照片列表响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "photos": [
      {
        "id": "uuid-string",
        "title": "远方",
        "description": "在山海之间寻找片刻宁静",
        "url": "https://example.com/photo.jpg"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 12,
      "total": 20,
      "totalPages": 2
    }
  }
}
```

### 数据格式转换

#### 文章数据

API 服务会自动将原始数据转换为便于展示的格式：

**原始数据：**
- `id`: UUID 字符串
- `date`: ISO 日期格式 "2026-01-28"
- `category`: 对象 `{ id, name }`
- `tags`: 标签对象数组

**转换后（PostDisplay）：**
- `date`: 格式化为 "01.28"
- `year`: 提取的年份 "2026"
- `categoryName`: 分类名称字符串（便捷访问）
- 保留原始的 `category` 和 `tags` 对象以供需要时使用

#### 照片数据

照片数据无需特殊转换，直接使用 API 返回的格式。

## 使用方法

### 1. 导入 API 服务

```typescript
// 导入文章相关 API
import { getPosts, getPostBySlug, getPostsWithPagination } from '@/lib/api';

// 导入照片相关 API
import { getPhotos, getPhotosWithPagination } from '@/lib/api';

// 或者导入所有
import * as API from '@/lib/api';
```

### 2. 调用 API

```typescript
// 获取文章列表（返回格式化后的 PostDisplay[] 数组）
const posts = await getPosts();
console.log(posts[0].categoryName); // "技术"
console.log(posts[0].date); // "01.28"
console.log(posts[0].year); // "2026"

// 获取文章列表（带分页参数）
const posts = await getPosts(1, 10); // 第 1 页，每页 10 条

// 获取文章列表（包含分页信息）
const { posts, pagination } = await getPostsWithPagination(1, 10);
console.log(`总共 ${pagination.total} 篇文章，共 ${pagination.totalPages} 页`);

// 获取单篇文章（返回格式化后的 PostDisplay）
const post = await getPostBySlug('article-slug');
console.log(post.categoryName); // "技术"
console.log(post.tags); // [{ id: "...", name: "Docker" }]

// 如果需要原始数据（不格式化）
const rawPosts = await getPostsRaw();
console.log(rawPosts[0].date); // "2026-01-28" (原始 ISO 格式)
console.log(rawPosts[0].category); // { id: "...", name: "技术" }

// ========== 照片 API ==========

// 获取照片列表（仅返回照片数组）
const photos = await getPhotos();
console.log(photos[0].title); // "远方"
console.log(photos[0].url); // 照片 URL

// 获取照片列表（带分页参数）
const photos = await getPhotos(1, 12); // 第 1 页，每页 12 张

// 获取照片列表（包含分页信息）
const { photos, pagination } = await getPhotosWithPagination(1, 12);
console.log(`总共 ${pagination.total} 张照片，共 ${pagination.totalPages} 页`);
```

### 3. 错误处理

所有 API 调用都应该包含错误处理：

```typescript
try {
  const posts = await getPosts();
  // 处理成功响应
} catch (error) {
  // 处理错误
  console.error('获取文章列表失败:', error);
}
```

## 添加新的 API 服务

### 1. 创建新的 API 文件

例如，创建 `comments.ts` 来管理评论相关的 API：

```typescript
import { apiClient } from './client';

export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

/**
 * 评论列表响应接口（如果 API 返回包装格式）
 */
export interface CommentsResponse {
  comments: Comment[];
  total: number;
}

/**
 * 获取评论列表
 * 注意：如果 API 返回 { code, message, data: { comments: [], total: 0 } }
 * apiClient 会自动提取 data 字段，所以这里泛型传入 CommentsResponse
 */
export async function getComments(postId: number): Promise<Comment[]> {
  const response = await apiClient<CommentsResponse>(`/api/posts/${postId}/comments`);
  return response.comments;
}

/**
 * 创建评论
 * 注意：如果 API 返回 { code, message, data: Comment }
 * apiClient 会自动提取 data 字段，所以这里泛型传入 Comment
 */
export async function createComment(
  postId: number,
  data: { content: string; author: string }
): Promise<Comment> {
  return apiClient<Comment>(`/api/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

### 2. 在 `index.ts` 中导出

```typescript
export * from './comments';
```

## API Client 特性

`apiClient` 提供了以下特性：

- ✅ 自动拼接基础 URL
- ✅ 统一的错误处理
- ✅ 请求超时控制（默认 10 秒）
- ✅ 自动添加 JSON Content-Type 头
- ✅ TypeScript 类型支持

## 配置项

在 `config.ts` 中可以修改以下配置：

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  TIMEOUT: 10000, // 超时时间（毫秒）
};
```

## 注意事项

1. 环境变量必须以 `NEXT_PUBLIC_` 开头才能在客户端访问
2. 修改 `.env.local` 后需要重启开发服务器
3. `.env.local` 文件已被 git 忽略，不会提交到版本库
4. 生产环境需要在部署平台配置相应的环境变量

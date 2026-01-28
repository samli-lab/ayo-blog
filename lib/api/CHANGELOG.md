# API 服务变更日志

## 最新更新 - 2026-01-28

### 🎉 完整支持实际 API 响应格式

#### 照片 API 更新

**主要变更：**

1. **响应格式统一**
   - ✅ 与文章 API 保持一致的响应格式处理
   - ✅ `apiClient` 自动提取 `data` 字段
   - ✅ 移除页面中对 `code` 字段的手动检查

2. **函数重构**
   
   **新增函数：**
   ```typescript
   getPhotos(page, pageSize): Promise<Photo[]>
   getPhotosWithPagination(page, pageSize): Promise<GalleryResponse>
   ```
   
   **废弃函数（保留兼容性）：**
   ```typescript
   getGalleryPhotos() // 现在是 getPhotosWithPagination 的别名
   ```

3. **类型定义更新**
   
   **之前：**
   ```typescript
   interface GalleryResponse {
     code: number;
     message: string;
     data: {
       photos: Photo[];
       pagination: Pagination;
     };
   }
   ```
   
   **现在：**
   ```typescript
   interface GalleryResponse {
     photos: Photo[];
     pagination: Pagination;
   }
   ```

4. **页面组件更新**
   - 移除 `resData.code === 200` 检查
   - 直接访问 `resData.photos` 和 `resData.pagination`
   - 简化错误处理逻辑

**使用示例：**

```typescript
// 推荐：获取照片列表（仅数组）
const photos = await getPhotos(1, 12);

// 获取完整信息（包含分页）
const { photos, pagination } = await getPhotosWithPagination(1, 12);
console.log(`共 ${pagination.total} 张照片`);
```

---

### 🎉 文章 API 更新

#### 主要变更

1. **响应格式适配**
   - ✅ 适配标准响应格式：`{ code, message, data }`
   - ✅ `apiClient` 自动提取 `data` 字段
   - ✅ 检查业务状态码 `code`

2. **数据类型更新**
   
   **Post 接口变更：**
   ```typescript
   // 之前
   interface Post {
     id: number;
     category: string;
     // ...
   }
   
   // 现在
   interface Post {
     id: string; // UUID
     category: Category; // 对象
     tags: Tag[]; // 标签数组
     // ...
   }
   ```

3. **新增类型**
   - `Category`: `{ id: string, name: string }`
   - `Tag`: `{ id: string, name: string }`
   - `PostDisplay`: 格式化后的展示数据，包含便捷字段：
     - `date`: "01.28" (格式化后)
     - `year`: "2026" (提取的年份)
     - `categoryName`: 分类名称字符串

4. **新增函数**
   - `formatPostForDisplay()`: 数据格式转换辅助函数
   - `getPostsRaw()`: 获取原始数据（不格式化）
   - `getPostsWithPaginationRaw()`: 获取原始数据（包含分页）
   - `getPostBySlugRaw()`: 获取原始文章数据

5. **响应结构变更**
   
   **文章列表响应：**
   ```typescript
   // API 返回
   {
     posts: Post[],
     pagination: {
       page: number,
       pageSize: number,
       total: number,
       totalPages: number
     }
   }
   
   // getPosts() 返回
   PostDisplay[] // 仅返回格式化后的文章数组
   
   // getPostsWithPagination() 返回
   {
     posts: PostDisplay[],
     pagination: Pagination
   }
   ```

#### 页面组件更新

1. **博客列表页 (`app/(page)/blog/page.tsx`)**
   - 使用 `PostDisplay` 类型
   - 显示 `post.categoryName` 而非 `post.category`

2. **博客详情页 (`app/(page)/blog/[slug]/page.tsx`)**
   - 使用 `PostDisplay` 类型
   - 显示 `post.categoryName`
   - metadata 中使用实际的 tags 数组

#### 兼容性

- ✅ 向后兼容：原有代码无需大改，只需类型更新
- ✅ 自动格式化：日期、分类等自动转换为便于展示的格式
- ✅ 灵活使用：提供 `Raw` 版本函数以获取原始数据

#### 使用示例

```typescript
// 推荐：使用格式化数据（默认）
const posts = await getPosts();
posts.forEach(post => {
  console.log(post.date); // "01.28"
  console.log(post.categoryName); // "技术"
});

// 需要原始数据时
const rawPosts = await getPostsRaw();
rawPosts.forEach(post => {
  console.log(post.date); // "2026-01-28"
  console.log(post.category.name); // "技术"
});
```

#### 迁移指南

如果你的代码中有使用旧的类型定义：

1. **类型导入更新**
   ```typescript
   // 之前
   import { Post } from '@/lib/api';
   
   // 现在（用于展示）
   import { PostDisplay } from '@/lib/api';
   
   // 或（用于原始数据）
   import { Post } from '@/lib/api';
   ```

2. **访问 category 字段**
   ```typescript
   // 之前
   post.category // "技术"
   
   // 现在（PostDisplay）
   post.categoryName // "技术"
   post.category.name // "技术" (也可以)
   
   // 现在（Post 原始）
   post.category.name // "技术"
   ```

3. **日期处理**
   ```typescript
   // 之前
   post.date // "09.09"
   post.year // "2025"
   
   // 现在（PostDisplay，自动格式化）
   post.date // "01.28"
   post.year // "2026"
   
   // 现在（Post 原始）
   post.date // "2026-01-28"
   ```

#### 文档更新

- ✅ 更新 `README.md` 包含完整的响应格式说明
- ✅ 添加数据格式转换说明
- ✅ 更新所有使用示例

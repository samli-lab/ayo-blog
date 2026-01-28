import { apiClient } from './client';
import type { Pagination } from './types';

/**
 * 分类接口
 */
export interface Category {
  id: string;
  name: string;
}

/**
 * 标签接口
 */
export interface Tag {
  id: string;
  name: string;
}

/**
 * 文章数据接口定义
 */
export interface Post {
  id: string; // UUID
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 日期格式 "2026-01-28"
  category: Category;
  tags: Tag[];
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 用于展示的文章接口（添加计算属性）
 */
export interface PostDisplay extends Post {
  year: string; // 从 date 提取的年份
  categoryName: string; // category.name 的便捷访问
}

/**
 * 辅助函数：将 Post 转换为 PostDisplay
 */
export function formatPostForDisplay(post: Post): PostDisplay {
  // 从日期中提取年份和格式化日期
  const dateObj = new Date(post.date);
  const year = dateObj.getFullYear().toString();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const formattedDate = `${month}.${day}`; // "01.28"

  return {
    ...post,
    date: formattedDate,
    year,
    categoryName: post.category.name,
  };
}

/**
 * 文章列表响应接口
 */
export interface PostsResponse {
  posts: Post[];
  pagination: Pagination;
}

/**
 * 获取文章列表（返回格式化后的数据，便于展示）
 * @param page 页码（可选）
 * @param pageSize 每页数量（可选）
 */
export async function getPosts(page?: number, pageSize?: number): Promise<PostDisplay[]> {
  // 构建查询参数
  const queryParams = new URLSearchParams();
  if (page !== undefined) queryParams.append('page', page.toString());
  if (pageSize !== undefined) queryParams.append('pageSize', pageSize.toString());
  
  const queryString = queryParams.toString();
  const endpoint = `/api/posts${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient<PostsResponse>(endpoint);
  // 将原始数据转换为展示格式
  return response.posts.map(formatPostForDisplay);
}

/**
 * 获取文章列表（原始数据，不格式化）
 * @param page 页码（可选）
 * @param pageSize 每页数量（可选）
 */
export async function getPostsRaw(page?: number, pageSize?: number): Promise<Post[]> {
  // 构建查询参数
  const queryParams = new URLSearchParams();
  if (page !== undefined) queryParams.append('page', page.toString());
  if (pageSize !== undefined) queryParams.append('pageSize', pageSize.toString());
  
  const queryString = queryParams.toString();
  const endpoint = `/api/posts${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient<PostsResponse>(endpoint);
  return response.posts;
}

/**
 * 格式化后的文章列表响应接口
 */
export interface PostsDisplayResponse {
  posts: PostDisplay[];
  pagination: Pagination;
}

/**
 * 获取文章列表（包含分页信息，返回格式化数据）
 * @param page 页码（可选）
 * @param pageSize 每页数量（可选）
 */
export async function getPostsWithPagination(
  page?: number,
  pageSize?: number
): Promise<PostsDisplayResponse> {
  const queryParams = new URLSearchParams();
  if (page !== undefined) queryParams.append('page', page.toString());
  if (pageSize !== undefined) queryParams.append('pageSize', pageSize.toString());
  
  const queryString = queryParams.toString();
  const endpoint = `/api/posts${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient<PostsResponse>(endpoint);
  
  return {
    posts: response.posts.map(formatPostForDisplay),
    pagination: response.pagination,
  };
}

/**
 * 获取文章列表（包含分页信息，原始数据）
 * @param page 页码（可选）
 * @param pageSize 每页数量（可选）
 */
export async function getPostsWithPaginationRaw(
  page?: number,
  pageSize?: number
): Promise<PostsResponse> {
  const queryParams = new URLSearchParams();
  if (page !== undefined) queryParams.append('page', page.toString());
  if (pageSize !== undefined) queryParams.append('pageSize', pageSize.toString());
  
  const queryString = queryParams.toString();
  const endpoint = `/api/posts${queryString ? `?${queryString}` : ''}`;
  
  return apiClient<PostsResponse>(endpoint);
}

/**
 * 根据 slug 获取文章详情（返回格式化数据）
 */
export async function getPostBySlug(slug: string): Promise<PostDisplay> {
  const post = await apiClient<Post>(`/api/posts/${slug}`);
  return formatPostForDisplay(post);
}

/**
 * 根据 slug 获取文章详情（原始数据）
 */
export async function getPostBySlugRaw(slug: string): Promise<Post> {
  return apiClient<Post>(`/api/posts/${slug}`);
}

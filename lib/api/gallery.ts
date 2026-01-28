import { apiClient } from './client';

/**
 * 照片接口定义
 */
export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 分页信息接口
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * 照片列表响应接口（API 返回的 data 字段内容）
 */
export interface GalleryResponse {
  photos: Photo[];
  pagination: Pagination;
}

/**
 * 获取照片列表（仅返回照片数组）
 * @param page 页码（默认 1）
 * @param pageSize 每页数量（默认 12）
 */
export async function getPhotos(page: number = 1, pageSize: number = 12): Promise<Photo[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('pageSize', pageSize.toString());
  
  const endpoint = `/api/gallery?${queryParams.toString()}`;
  const response = await apiClient<GalleryResponse>(endpoint);
  
  return response.photos;
}

/**
 * 获取照片列表（包含分页信息）
 * @param page 页码（默认 1）
 * @param pageSize 每页数量（默认 12）
 */
export async function getPhotosWithPagination(
  page: number = 1,
  pageSize: number = 12
): Promise<GalleryResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('pageSize', pageSize.toString());
  
  const endpoint = `/api/gallery?${queryParams.toString()}`;
  
  return apiClient<GalleryResponse>(endpoint);
}

/**
 * 【已废弃】为了保持向后兼容性而保留
 * @deprecated 请使用 getPhotosWithPagination 代替
 */
export const getGalleryPhotos = getPhotosWithPagination;

/**
 * 可以在这里继续添加其他接口，例如：
 * export const uploadPhoto = (data: FormData) => ...
 * export const deletePhoto = (id: string) => ...
 */


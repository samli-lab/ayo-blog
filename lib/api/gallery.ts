import { apiClient } from './client';

// 类型定义
export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface GalleryResponse {
  code: number;
  message: string;
  data: {
    photos: Photo[];
    pagination: Pagination;
  };
}

/**
 * 获取相册照片列表
 */
export const getGalleryPhotos = (page: number = 1, pageSize: number = 12) => {
  return apiClient<GalleryResponse>(`/api/gallery?page=${page}&pageSize=${pageSize}`);
};

/**
 * 可以在这里继续添加其他接口，例如：
 * export const uploadPhoto = (data: FormData) => ...
 * export const deletePhoto = (id: string) => ...
 */


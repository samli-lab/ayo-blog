import { API_CONFIG } from './config';

/**
 * 统一的 API 请求客户端
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { BASE_URL } = API_CONFIG;
  
  // 拼接完整的 URL
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      // 处理非 200 响应
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `请求失败: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
}


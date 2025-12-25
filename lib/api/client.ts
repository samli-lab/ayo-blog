import { API_CONFIG } from './config';

/**
 * 统一的 API 请求客户端
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { BASE_URL, TIMEOUT } = API_CONFIG;
  
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
    // 添加超时控制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
    
    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 处理非 200 响应
      let errorMessage = `请求失败: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 如果响应不是JSON，使用默认错误信息
        if (response.status === 404) {
          errorMessage = '请求的资源不存在';
        } else if (response.status >= 500) {
          errorMessage = '服务器错误，请稍后重试';
        } else if (response.status === 0 || response.type === 'error') {
          errorMessage = '网络连接失败，请检查网络设置';
        }
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    
    // 处理超时错误
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('请求超时，请检查网络连接后重试');
    }
    
    // 处理网络错误
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('网络连接失败，请检查网络设置');
    }
    
    throw error;
  }
}


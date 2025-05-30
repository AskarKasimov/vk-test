import { apiClient } from './client.ts';

export interface HttpClient {
  get<T>(url: string, params?: any): Promise<T>;

  post<T>(url: string, data?: any): Promise<T>;

  put<T>(url: string, data?: any): Promise<T>;

  patch<T>(url: string, data?: any): Promise<T>;

  delete<T>(url: string): Promise<T>;
}

export const http: HttpClient = {
  get: <T>(url: string, params?: any) =>
    apiClient.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: any) =>
    apiClient.post<T>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: any) =>
    apiClient.put<T>(url, data).then((res) => res.data),

  patch: <T>(url: string, data?: any) =>
    apiClient.patch<T>(url, data).then((res) => res.data),

  delete: <T>(url: string) => apiClient.delete<T>(url).then((res) => res.data),
};

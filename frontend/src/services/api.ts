import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import type { 
  ServerStatus, 
  ClientInfo, 
  ChannelInfo, 
  ServerStats, 
  ApiResponse,
  FeedbackForm,
  Announcement 
} from '../types';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证 token 等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 服务器状态相关 API
export const serverApi = {
  // 获取所有服务器状态
  getStatus: (): Promise<ApiResponse<ServerStatus[]>> => 
    api.get('/api/servers'),
  
  // 获取特定服务器状态
  getServerStatus: (serverId: string): Promise<ApiResponse<ServerStatus>> => 
    api.get(`/api/servers/${serverId}`),
  
  // 获取在线用户列表
  getClients: (serverId: string): Promise<ApiResponse<ClientInfo[]>> => 
    api.get(`/api/servers/${serverId}/clients`),
  
  // 获取频道列表
  getChannels: (serverId: string): Promise<ApiResponse<ChannelInfo[]>> => 
    api.get(`/api/servers/${serverId}/channels`),
  
  // 获取服务器统计信息
  getStats: (serverId: string): Promise<ApiResponse<ServerStats>> => 
    api.get(`/api/servers/${serverId}/stats`),
  
  // 获取历史统计数据
  getHistoryStats: (serverId: string, period: string = '24h'): Promise<ApiResponse<any[]>> => 
    api.get(`/api/servers/${serverId}/history`, { params: { period } }),
};

// 公告相关 API
export const announcementApi = {
  // 获取公告列表
  getAnnouncements: (): Promise<ApiResponse<Announcement[]>> => 
    api.get('/api/announcements'),
  
  // 获取特定公告
  getAnnouncement: (id: string): Promise<ApiResponse<Announcement>> => 
    api.get(`/api/announcements/${id}`),
};

// 反馈相关 API
export const feedbackApi = {
  // 提交反馈
  submitFeedback: (feedback: FeedbackForm): Promise<ApiResponse<void>> => 
    api.post('/api/feedback', feedback),
};

// 系统信息 API
export const systemApi = {
  // 获取系统健康状态
  getHealth: (): Promise<ApiResponse<{ status: string; timestamp: Date }>> => 
    api.get('/api/health'),
  
  // 获取版本信息
  getVersion: (): Promise<ApiResponse<{ version: string; buildTime: Date }>> => 
    api.get('/api/version'),
};

export default api;

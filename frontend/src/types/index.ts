// 服务器状态相关类型
export interface ServerStatus {
  id: string;
  name: string;
  nameEn: string;
  host: string;
  port: number;
  isOnline: boolean;
  clientsOnline: number;
  maxClients: number;
  ping: number;
  uptime: number;
  packetLoss: number;
  bytesReceived: number;
  bytesSent: number;
  platform: string;
  version: string;
  lastUpdated: Date;
}

// 用户信息类型
export interface ClientInfo {
  id: number;
  nickname: string;
  channelId: number;
  channelName: string;
  connected: number;
  country?: string;
  platform?: string;
  version?: string;
  inputMuted?: boolean;
  outputMuted?: boolean;
  inputHardware?: boolean;
  outputHardware?: boolean;
  isRecording?: boolean;
}

// 频道信息类型
export interface ChannelInfo {
  id: number;
  name: string;
  clientsCount: number;
  maxClients: number;
  parentId?: number;
  order: number;
  permanent: boolean;
  topic?: string;
}

// 服务器统计信息
export interface ServerStats {
  totalConnections: number;
  peakClients: number;
  averagePing: number;
  uptimePercentage: number;
  bytesUploaded: number;
  bytesDownloaded: number;
}

// API 响应基础类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 反馈表单类型
export interface FeedbackForm {
  name: string;
  email?: string;
  subject: string;
  message: string;
  type: 'bug' | 'suggestion' | 'other';
}

// 公告类型
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'maintenance';
  createdAt: Date;
  expiresAt?: Date;
  isVisible: boolean;
}

// 主题类型
export type Theme = 'light' | 'dark';

// 语言类型
export type Language = 'zh' | 'en';

// TeamSpeak 查询相关类型
export interface ServerInfo {
  id: string;
  name: string;
  nameEn: string;
  host: string;
  queryPort: number;
  serverPort: number;
  username: string;
  password: string;
  tsUrl: string;
}

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

export interface ClientInfo {
  id: number;
  nickname: string;
  channelId: number;
  channelName: string;
  connected: number; // 改为connected以匹配返回结构
  idleTime?: number;
  country?: string;
  platform?: string;
  version?: string;
  inputMuted?: boolean;
  outputMuted?: boolean;
  inputHardware?: boolean;
  outputHardware?: boolean;
  isRecording?: boolean;
}

export interface ChannelInfo {
  id: number;
  name: string;
  topic: string;
  description: string;
  clientsCount: number;
  maxClients: number;
  parentId: number;
  order: number;
  permanent: boolean;
  semiPermanent: boolean;
  temporary: boolean;
  codecQuality: number;
  neededTalkPower: number;
}

export interface ServerStats {
  totalConnections: number;
  totalConnectionsLastHour: number;
  totalConnectionsLastDay: number;
  peakClients: number;
  peakClientsDate: Date;
  averagePing: number;
  packetsLoss: number;
  bytesUploaded: number;
  bytesDownloaded: number;
  uptimePercentage: number;
  fileTransfers: number;
  controlBytesReceived: number;
  controlBytesSent: number;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
}

// 反馈表单类型
export interface FeedbackForm {
  name: string;
  email?: string;
  qq?: string;
  subject: string;
  message: string;
  type: 'bug' | 'suggestion' | 'question' | 'other';
  serverInfo?: {
    userAgent: string;
    ip: string;
    timestamp: Date;
  };
}

// 公告类型
export interface Announcement {
  id: string;
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  type: 'info' | 'warning' | 'maintenance' | 'update';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  isVisible: boolean;
  author: string;
  targetServers?: string[];
}

// 历史统计数据类型
export interface HistoryStats {
  timestamp: Date;
  serverId: string;
  clientsOnline: number;
  ping: number;
  bytesUploaded: number;
  bytesDownloaded: number;
  packetsLoss: number;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

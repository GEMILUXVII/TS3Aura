import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 合并 className 的工具函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化在线时间
export function formatUptime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}天${hours > 0 ? ` ${hours}小时` : ''}`;
  }
  if (hours > 0) {
    return `${hours}小时${minutes > 0 ? ` ${minutes}分钟` : ''}`;
  }
  if (minutes < 1) {
    return '小于1分钟';
  }
  return `${minutes}分钟`;
}

// 格式化文件大小
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// 格式化延迟显示
export function formatPing(ping: number): string {
  if (ping < 0) return '超时';
  return `${ping}ms`;
}

// 获取延迟状态颜色
export function getPingStatusColor(ping: number): string {
  if (ping < 0) return 'text-red-400';
  if (ping < 50) return 'text-green-400';
  if (ping < 100) return 'text-yellow-400';
  return 'text-red-400';
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // 兼容旧浏览器
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (fallbackError) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// 生成 TeamSpeak 连接 URL
export function generateTsUrl(host: string, nickname?: string): string {
  let url = `ts3server://${host}`;
  if (nickname) {
    url += `?nickname=${encodeURIComponent(nickname)}`;
  }
  return url;
}

// 格式化日期时间
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// 生成随机 ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

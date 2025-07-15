// API 基础配置
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://api.kcpo.us' 
  : 'http://localhost:3001';

// 服务器配置
export const SERVERS = {
  server1: {
    name: '一号服务器',
    nameEn: 'Server I',
    host: 'ts1.kcpo.us',
    port: 9987,
    tsUrl: 'ts3server://ts1.kcpo.us'
  },
  server2: {
    name: '二号服务器',
    nameEn: 'Server II', 
    host: 'ts2.kcpo.us',
    port: 9987,
    tsUrl: 'ts3server://ts2.kcpo.us'
  }
} as const;

// 联系信息
export const CONTACT_INFO = {
  telegram: 'https://t.me/forSeasons7',
  qq: '2768663874',
  qqGroup: '461845925',
  email: '2768663874@qq.com'
} as const;

// 主题配置
export const THEME_CONFIG = {
  colors: {
    primary: '#1E90FF',
    secondary: '#008000',
    accent: '#FF4500'
  }
} as const;

// 更新间隔（毫秒）
export const UPDATE_INTERVALS = {
  serverStatus: 30000, // 30秒
  userList: 10000,     // 10秒
  statistics: 60000    // 1分钟
} as const;

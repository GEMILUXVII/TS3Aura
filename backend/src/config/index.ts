import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // TeamSpeak server configuration
  servers: {
    server1: {
      id: 'server1',
      name: '一号服务器',
      nameEn: 'Server I',
      host: process.env.SERVER1_HOST || 'ts1.kcpo.us',
      queryPort: parseInt(process.env.SERVER1_PORT || '10012'),
      serverPort: 9987, // 映射到容器内9987端口
      username: process.env.SERVER1_USERNAME || 'serveradmin',
      password: process.env.SERVER1_PASSWORD || '',
      tsUrl: 'ts3server://ts1.kcpo.us'
    },
    server2: {
      id: 'server2',
      name: '二号服务器',
      nameEn: 'Server II',
      host: process.env.SERVER2_HOST || 'ts2.kcpo.us',
      queryPort: parseInt(process.env.SERVER2_PORT || '10011'),
      serverPort: 9987, // 默认的TeamSpeak服务器端口
      username: process.env.SERVER2_USERNAME || 'serveradmin',
      password: process.env.SERVER2_PASSWORD || '',
      tsUrl: 'ts3server://ts2.kcpo.us'
    }
  },
  
  // CORS configuration
  corsOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173').split(','),
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  },
  
  // Email configuration
  email: {
    enabled: process.env.SMTP_HOST ? true : false,
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || 'user@example.com',
    password: process.env.SMTP_PASS || ''
  },
  
  // Contact information
  contactEmail: process.env.CONTACT_EMAIL || 'contact@example.com',
  contact: {
    qq: process.env.CONTACT_QQ || 'your_qq_number',
    qqGroup: process.env.CONTACT_QQ_GROUP || 'your_qq_group',
    email: process.env.CONTACT_EMAIL || 'contact@example.com',
    telegram: process.env.CONTACT_TELEGRAM || 'https://t.me/your_username'
  },
  
  // Cache configuration
  cache: {
    defaultTtl: parseInt(process.env.CACHE_TTL || '30000'),
    statsTtl: parseInt(process.env.STATS_CACHE_TTL || '300000')
  },
  
  // Logging configuration
  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || 'logs/app.log'
};

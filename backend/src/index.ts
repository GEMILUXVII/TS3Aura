import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { logger } from './utils/logger.js';
import serverRoutes from './routes/servers.js';
import announcementRoutes from './routes/announcements.js';
import feedbackRoutes from './routes/feedback.js';
import healthRoutes from './routes/health.js';

const app = express();

// 基础中间件
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 日志中间件
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// 速率限制
app.use(rateLimiter);

// API 路由
app.use('/api/servers', serverRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/health', healthRoutes);

// 根路径
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'KCPO.US TeamSpeak API Server',
    version: '1.0.0',
    timestamp: new Date(),
    endpoints: {
      servers: '/api/servers',
      announcements: '/api/announcements', 
      feedback: '/api/feedback',
      health: '/api/health'
    }
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    timestamp: new Date(),
  });
});

// 错误处理中间件
app.use(errorHandler);

// 启动服务器
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`🚀 KCPO.US TeamSpeak API Server started on port ${PORT}`);
  logger.info(`📱 Environment: ${config.nodeEnv}`);
  logger.info(`🌐 CORS Origins: ${config.corsOrigins.join(', ')}`);
  logger.info(`📡 Monitoring servers: ${Object.keys(config.servers).join(', ')}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

export default app;

import winston from 'winston';
import { config } from '../config/index.js';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// 自定义日志格式
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// 创建日志记录器
export const logger = createLogger({
  level: config.logLevel || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // 控制台输出
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    }),
    // 文件输出
    new transports.File({ 
      filename: config.logFile || 'logs/app.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

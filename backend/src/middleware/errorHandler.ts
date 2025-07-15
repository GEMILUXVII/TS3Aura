import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

// 错误处理中间件
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = error.statusCode || 500;
  
  // 日志记录
  logger.error(`Error: ${error.message || 'Unknown error'}`);
  if (error.stack) {
    logger.error(`Stack: ${error.stack}`);
  }
  
  // 发送响应
  res.status(statusCode).json({
    success: false,
    error: error.message || 'Internal server error',
    timestamp: new Date()
  });
};

import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { config } from '../config/index.js';

// 创建内存速率限制器
const limiter = new RateLimiterMemory({
  points: config.rateLimit?.maxRequests || 100, // 最大请求数
  duration: config.rateLimit?.windowMs ? config.rateLimit.windowMs / 1000 : 900 // 时间窗口（秒）
});

// 速率限制中间件
export const rateLimiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 使用IP作为限制键
    const key = req.ip || 'unknown';
    await limiter.consume(key);
    next();
  } catch (error) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
      timestamp: new Date()
    });
  }
};

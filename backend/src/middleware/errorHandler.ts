import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/index.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      timestamp: new Date(),
    });
  }

  // Log the error for debugging purposes
  logger.error('An unexpected error occurred:', err);

  // For other types of errors, send a generic 500 response
  // In a production environment, you might not want to send the error message to the client
  return res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    timestamp: new Date(),
  });
};

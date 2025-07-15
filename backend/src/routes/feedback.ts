import { Router } from 'express';
import nodemailer from 'nodemailer';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

const router = Router();

// 创建 Nodemailer 配置
const transporter = nodemailer.createTransport({
  host: config.email?.host || 'smtp.example.com',
  port: config.email?.port || 587,
  secure: false,
  auth: {
    user: config.email?.user || '',
    pass: config.email?.password || ''
  }
});

// 发送反馈
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message, category = 'general' } = req.body;
    
    // 基本验证
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email and message are required',
        timestamp: new Date()
      });
    }
    
    if (config.email?.enabled) {
      // 发送邮件通知
      await transporter.sendMail({
        from: `"TeamSpeak Web" <${config.email.user}>`,
        to: config.contactEmail || config.email.user,
        subject: `[Feedback] ${category.toUpperCase()} - from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Category: ${category}
          
          Message:
          ${message}
        `,
        html: `
          <h3>Feedback from TeamSpeak Web</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <h4>Message:</h4>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      });
    } else {
      // 如果邮件未启用，只记录日志
      logger.info(`Feedback received from ${name} (${email}): ${message}`);
    }
    
    res.json({
      success: true,
      message: 'Feedback received successfully',
      timestamp: new Date()
    });
  } catch (error) {
    logger.error(`Error sending feedback: ${error}`);
    next(error);
  }
  return;
});

export default router;

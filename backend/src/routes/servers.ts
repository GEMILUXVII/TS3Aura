import { Router } from 'express';
import { teamSpeakService } from '../services/teamspeak.js';

const router = Router();

// 获取所有服务器状态
router.get('/', async (req, res, next) => {
  try {
    const servers = await teamSpeakService.getAllServerStatus();
    res.json({
      success: true,
      data: servers,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
  return;
});

// 获取特定服务器状态
router.get('/:serverId', async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const server = await teamSpeakService.getServerStatus(serverId);
    
    if (!server) {
      return res.status(404).json({
        success: false,
        error: `Server with ID ${serverId} not found`,
        timestamp: new Date()
      });
    }
    
    return res.json({
      success: true,
      data: server,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
    return;
  }
});

// 获取特定服务器的在线用户
router.get('/:serverId/clients', async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const clients = await teamSpeakService.getOnlineClients(serverId);
    
    return res.json({
      success: true,
      data: clients,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
    return;
  }
});

// 获取特定服务器的频道列表
router.get('/:serverId/channels', async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const channels = await teamSpeakService.getChannels(serverId);
    
    return res.json({
      success: true,
      data: channels,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
    return;
  }
});

export default router;

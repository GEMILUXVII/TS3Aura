import { TeamSpeak } from 'ts3-nodejs-library';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import type { ServerStatus, ClientInfo } from '../types/index.js';

class TeamSpeakService {
  private servers: Map<string, { 
    client: TeamSpeak | null;
    status: ServerStatus;
    lastConnectAttempt: number;
  }> = new Map();
  
  constructor() {
    // 初始化服务器状态
    Object.values(config.servers).forEach(server => {
      this.servers.set(server.id, {
        client: null,
        status: {
          id: server.id,
          name: server.name,
          nameEn: server.nameEn,
          host: server.host,
          port: server.queryPort,
          isOnline: false,
          clientsOnline: 0,
          maxClients: 0,
          ping: 0,
          uptime: 0,
          lastUpdated: new Date()
        },
        lastConnectAttempt: 0
      });
    });
  }

  /**
   * 获取所有服务器状态
   */
  public async getAllServerStatus(): Promise<ServerStatus[]> {
    const statuses: ServerStatus[] = [];
    
    for (const [serverId, server] of this.servers.entries()) {
      try {
        // 更新状态
        await this.updateServerStatus(serverId);
        statuses.push(server.status);
      } catch (error) {
        logger.error(`Error getting status for server ${serverId}: ${error}`);
        statuses.push(server.status); // 返回当前缓存的状态
      }
    }
    
    return statuses;
  }
  
  /**
   * 获取单个服务器状态
   */
  public async getServerStatus(serverId: string): Promise<ServerStatus | null> {
    const server = this.servers.get(serverId);
    if (!server) return null;
    
    try {
      await this.updateServerStatus(serverId);
      return server.status;
    } catch (error) {
      logger.error(`Error getting status for server ${serverId}: ${error}`);
      return server.status; // 返回当前缓存的状态
    }
  }
  
  /**
   * 获取服务器在线客户端
   */
  public async getOnlineClients(serverId: string): Promise<ClientInfo[]> {
    const server = this.servers.get(serverId);
    if (!server) return [];

    const client = await this.getConnection(serverId);
    if (!client) return [];

    try {
      const [clients, channels] = await Promise.all([
        client.clientList({ clientType: 0 }),
        client.channelList(),
      ]);

      const channelMap = new Map(channels.map((ch) => [ch.cid, ch.name]));

      return clients.map((c) => {
        const clientData = c as any;
        return {
          id: parseInt(String(clientData.clid || '0')),
          nickname: String(clientData.clientNickname || clientData.nickname || ''),
          connectionTime: parseInt(String(clientData.connectionConnectedTime || clientData.connectedTime || '0')),
          idleTime: parseInt(String(clientData.clientIdleTime || clientData.idleTime || '0')),
          platform: String(clientData.clientPlatform || clientData.platform || 'unknown'),
          version: String(clientData.clientVersion || clientData.version || 'unknown'),
          country: String(clientData.clientCountry || clientData.country || 'unknown'),
          channelId: parseInt(String(clientData.cid || '0')),
          channelName: channelMap.get(clientData.cid) || '未知频道',
        };
      });
    } catch (error) {
      logger.error(`Error getting clients for server ${serverId}: ${error}`);
      return [];
    }
  }

  /**
   * 获取服务器频道列表
   */
  public async getChannels(serverId: string): Promise<any[]> {
    const server = this.servers.get(serverId);
    if (!server) return [];
    
    const client = await this.getConnection(serverId);
    if (!client) return [];
    
    try {
      const channels = await client.channelList();
      return channels.map(channel => {
        // 尽量获取所有可能的属性，不同版本的 TeamSpeak 库可能有不同的属性名
        const channelData = channel as any;
        return {
          id: parseInt(String(channelData.cid || '0')),
          pid: parseInt(String(channelData.pid || '0')),
          name: String(channelData.name || ''),
          topic: String(channelData.topic || ''),
          clients: parseInt(String(channelData.totalClients || '0')),
          // 其他基本属性
          maxClients: parseInt(String(channelData.maxclients || '0')),
          codec: parseInt(String(channelData.codec || '0')),
          iconId: parseInt(String(channelData.iconId || '0'))
        };
      });
    } catch (error) {
      logger.error(`Error getting channels for server ${serverId}: ${error}`);
      return [];
    }
  }
  
  /**
   * 获取服务器客户端详细信息（包括所在频道）
   */
  public async getDetailedClients(serverId: string): Promise<any[]> {
    const server = this.servers.get(serverId);
    if (!server) return [];
    
    const client = await this.getConnection(serverId);
    if (!client) return [];
    
    try {
      const clients = await client.clientList({ clientType: 0 });
      const channels = await this.getChannels(serverId);
      
      return clients.map(c => {
        // 使用类型断言获取所有可能的属性
        const clientData = c as any;
        const channelId = parseInt(String(clientData.cid || '0'));
        const channel = channels.find(ch => ch.id === channelId);
        
        return {
          id: parseInt(String(clientData.clid || '0')),
          databaseId: parseInt(String(clientData.clientDatabaseId || clientData.databaseId || '0')),
          uniqueId: String(clientData.clientUniqueIdentifier || clientData.uniqueIdentifier || ''),
          nickname: String(clientData.clientNickname || clientData.nickname || ''),
          type: parseInt(String(clientData.clientType || clientData.type || '0')),
          away: Boolean(clientData.clientAway || clientData.away),
          awayMessage: String(clientData.clientAwayMessage || clientData.awayMessage || ''),
          talkPower: parseInt(String(clientData.clientTalkPower || clientData.talkPower || '0')),
          isTalking: Boolean(clientData.clientIsTalker || clientData.isTalker),
          inputMuted: Boolean(clientData.clientInputMuted || clientData.inputMuted),
          outputMuted: Boolean(clientData.clientOutputMuted || clientData.outputMuted),
          inputHardware: Boolean(clientData.clientInputHardware || clientData.inputHardware),
          outputHardware: Boolean(clientData.clientOutputHardware || clientData.outputHardware),
          channel: channel ? {
            id: channel.id,
            name: channel.name
          } : null,
          serverGroups: String(clientData.clientServergroups || clientData.servergroups || '').split(',').filter(Boolean).map(id => parseInt(id)),
          platform: String(clientData.clientPlatform || clientData.platform || ''),
          version: String(clientData.clientVersion || clientData.version || ''),
          country: String(clientData.clientCountry || clientData.country || ''),
          idleTime: parseInt(String(clientData.clientIdleTime || clientData.idleTime || '0')),
          connected: parseInt(String(clientData.connectionConnectedTime || clientData.connectedTime || '0')),
          created: parseInt(String(clientData.clientCreated || clientData.created || '0'))
        };
      });
    } catch (error) {
      logger.error(`Error getting detailed clients for server ${serverId}: ${error}`);
      return [];
    }
  }
  
  /**
   * 更新服务器状态
   */
  private async updateServerStatus(serverId: string): Promise<void> {
    const server = this.servers.get(serverId);
    if (!server) return;
    
    try {
      const client = await this.getConnection(serverId);
      if (!client) {
        // 更新为离线状态
        server.status.isOnline = false;
        server.status.lastUpdated = new Date();
        return;
      }
      
      // 获取服务器信息
      const serverInfo = await client.serverInfo();
      const clientList = await client.clientList({ clientType: 0 });
      
      // 获取更详细的服务器信息
      const hostInfo = await client.hostInfo().catch(() => null);
      const connectionInfo = await client.connectionInfo().catch((error) => {
        logger.warn(`Could not get connection info for server ${serverId}, maybe no clients online? Error: ${error.message}`);
        return null;
      });
      
      // 更新状态
      server.status.isOnline = true;
      server.status.clientsOnline = clientList.length;
      server.status.maxClients = parseInt(String(serverInfo.maxClients || '0'));
      server.status.uptime = parseInt(String(serverInfo.virtualserverUptime || '0'));
      server.status.name = String(serverInfo.virtualserverName || server.status.name);
      server.status.ping = connectionInfo ? parseInt(String(connectionInfo.connectionPing || '0')) : 0;
      server.status.packetLoss = connectionInfo ? parseFloat(String(connectionInfo.connectionPacketlossTotal || '0')) : 0;
      server.status.bytesReceived = connectionInfo ? parseInt(String(connectionInfo.connectionBytesReceivedTotal || '0')) : 0;
      server.status.bytesSent = connectionInfo ? parseInt(String(connectionInfo.connectionBytesSentTotal || '0')) : 0;
      server.status.platform = hostInfo ? String(hostInfo.instanceOS || '') : '';
      server.status.version = String(serverInfo.virtualserverVersion || '');
      server.status.lastUpdated = new Date();
      
    } catch (error) {
      logger.error(`Error updating status for server ${serverId}: ${error}`);
      server.status.isOnline = false;
      server.status.lastUpdated = new Date();
    }
  }
  
  /**
   * 获取TeamSpeak连接
   */
  private async getConnection(serverId: string): Promise<TeamSpeak | null> {
    const server = this.servers.get(serverId);
    if (!server) return null;
    
    // 如果已经有连接，直接返回
    if (server.client) return server.client;
    
    // 防止过于频繁的连接尝试
    const now = Date.now();
    if (now - server.lastConnectAttempt < 5000) {
      return null;
    }
    
    server.lastConnectAttempt = now;
    
    // 获取服务器配置
    const serverConfig = config.servers[serverId as keyof typeof config.servers];
    if (!serverConfig) return null;
    
    try {
      // 创建新连接
      logger.info(`Attempting to connect to TeamSpeak server ${serverId} (${serverConfig.host}:${serverConfig.queryPort})`);
      const client = await TeamSpeak.connect({
        host: serverConfig.host,
        queryport: serverConfig.queryPort,
        username: serverConfig.username,
        password: serverConfig.password,
        nickname: 'KCPO_API_Bot',
        keepAlive: true,
        keepAliveTimeout: 60,
      });
      
      logger.info(`Successfully connected to TeamSpeak query port for server ${serverId}`);

      // 尝试不同方式选择虚拟服务器
      try {
        await client.useByPort(serverConfig.serverPort);
        logger.info(`Successfully selected virtual server on port ${serverConfig.serverPort} for server ${serverId}`);
      } catch (usePortError) {
        logger.warn(`Failed to select virtual server by port ${serverConfig.serverPort}, trying to list servers...`);
        // 如果通过端口选择失败，尝试列出所有虚拟服务器并查找匹配项
        const serverList = await client.serverList();
        const targetServer = serverList.find(s => s.virtualserverPort === serverConfig.serverPort);
        
        if (targetServer) {
          await client.use(targetServer.virtualserverId);
          logger.info(`Successfully selected virtual server with ID ${targetServer.virtualserverId} for server ${serverId}`);
        } else {
          throw new Error(`No virtual server found on port ${serverConfig.serverPort}`);
        }
      }
      
      // 成功连接后保存
      server.client = client;
      server.status.isOnline = true;
      
      // 设置断开连接处理
      client.on('error', (err) => {
        logger.error(`TeamSpeak connection error for server ${serverId}: ${err.message}`);
        server.client = null;
        server.status.isOnline = false;
      });
      
      client.on('close', () => {
        logger.info(`TeamSpeak connection closed for server ${serverId}`);
        server.client = null;
        server.status.isOnline = false;
      });
      
      return client;
    } catch (error: any) {
      logger.error(`Failed to connect to TeamSpeak server ${serverId}: ${error.message}`);
      server.client = null;
      server.status.isOnline = false;
      return null;
    }
  }
  
  /**
   * 关闭所有连接
   */
  public async closeAllConnections(): Promise<void> {
    for (const [serverId, server] of this.servers.entries()) {
      if (server.client) {
        try {
          await server.client.quit();
        } catch (error) {
          logger.error(`Error closing connection to server ${serverId}: ${error}`);
        }
        server.client = null;
      }
    }
  }
}

export const teamSpeakService = new TeamSpeakService();

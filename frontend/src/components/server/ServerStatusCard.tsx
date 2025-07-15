import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useServerStatus } from '../../hooks/useApi';
import { copyToClipboard, formatPing, getPingStatusColor, formatBytes } from '../../utils';
import { SERVERS } from '../../config/constants';
import toast from 'react-hot-toast';

export const ServerStatusCard: React.FC = () => {
  const { data: statusData, isLoading, isError } = useServerStatus();
  const [copiedServer, setCopiedServer] = React.useState<string | null>(null);

  const handleCopyAddress = async (address: string, serverId: string) => {
    const success = await copyToClipboard(address);
    if (success) {
      setCopiedServer(serverId);
      toast.success('服务器地址已复制到剪贴板');
      setTimeout(() => setCopiedServer(null), 2000);
    } else {
      toast.error('复制失败，请手动复制');
    }
  };

  const handleConnect = (tsUrl: string) => {
    window.open(tsUrl, '_self');
    toast.success('正在启动 TeamSpeak...');
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-dark-600 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-dark-600 rounded"></div>
            <div className="h-4 bg-dark-600 rounded w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-500/50">
        <div className="text-center text-red-400">
          <p>无法获取服务器状态</p>
          <p className="text-sm text-gray-500 mt-2">请稍后重试</p>
        </div>
      </Card>
    );
  }

  const servers = statusData?.data || [];

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-2xl font-bold text-center gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        服务器状态 Server Status
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(SERVERS).map(([serverId, serverConfig]) => {
          const serverStatus = servers.find(s => s.id === serverId);
          const isOnline = serverStatus?.isOnline ?? false;
          const ping = serverStatus?.ping ?? -1;
          const clientsOnline = serverStatus?.clientsOnline ?? 0;
          const maxClients = serverStatus?.maxClients ?? 0;

          return (
            <Card key={serverId} hover glow={isOnline} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {serverConfig.name}
                  </h3>
                  <p className="text-sm text-gray-400">{serverConfig.nameEn}</p>
                </div>
                <div className={`flex items-center gap-2 ${isOnline ? 'status-online' : 'status-offline'}`}>
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} ${isOnline ? 'animate-pulse' : ''}`}></div>
                  <span className="font-medium">
                    {isOnline ? '在线' : '离线'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">在线用户:</span>
                  <p className="text-white font-semibold">
                    {clientsOnline} / {maxClients}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">延迟:</span>
                  <p className={`font-semibold ${getPingStatusColor(ping)}`}>
                    {formatPing(ping)}
                  </p>
                </div>
                {isOnline && serverStatus?.packetLoss !== undefined && (
                  <div>
                    <span className="text-gray-400">丢包率:</span>
                    <p className="text-white font-semibold">
                      {(serverStatus.packetLoss * 100).toFixed(2)}%
                    </p>
                  </div>
                )}
                {isOnline && serverStatus?.version && (
                  <div>
                    <span className="text-gray-400">版本:</span>
                    <p className="text-white font-semibold truncate" title={serverStatus.version}>
                      {serverStatus.version}
                    </p>
                  </div>
                )}
              </div>

              {isOnline && (serverStatus?.bytesReceived !== undefined || serverStatus?.bytesSent !== undefined) && (
                <div className="mt-2 text-xs bg-dark-600/50 p-2 rounded">
                  <div className="flex justify-between text-gray-400">
                    <span className="flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      流量统计
                    </span>
                    {serverStatus?.platform && (
                      <span className="text-gray-500">{serverStatus.platform}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {serverStatus?.bytesReceived !== undefined && (
                      <div>
                        <span className="text-gray-400">接收:</span>
                        <p className="text-white font-semibold">
                          {formatBytes(serverStatus.bytesReceived)}
                        </p>
                      </div>
                    )}
                    {serverStatus?.bytesSent !== undefined && (
                      <div>
                        <span className="text-gray-400">发送:</span>
                        <p className="text-white font-semibold">
                          {formatBytes(serverStatus.bytesSent)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">地址:</span>
                  <code className="bg-dark-600 px-2 py-1 rounded text-primary-400 flex-1">
                    {serverConfig.host}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopyAddress(serverConfig.host, serverId)}
                  >
                    {copiedServer === serverId ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleConnect(serverConfig.tsUrl)}
                    disabled={!isOnline}
                  >
                    <ExternalLink className="w-4 h-4" />
                    一键连接
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopyAddress(serverConfig.tsUrl, `${serverId}_url`)}
                  >
                    {copiedServer === `${serverId}_url` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Crown, Globe } from 'lucide-react';
import { Card } from '../ui/Card';
import { useClients } from '../../hooks/useApi';
import { formatUptime } from '../../utils';
import { SERVERS } from '../../config/constants';
import type { ClientInfo } from '../../types';

// 扩展 ClientInfo 接口以包含 serverHost
interface ClientInfoWithServer extends ClientInfo {
  serverHost: string;
}

export const OnlineUsersCard: React.FC = () => {
  const serverIds = Object.keys(SERVERS);
  const clientQueries = useClients(serverIds);

  const isLoading = clientQueries.some(q => q.isLoading);
  const isError = clientQueries.some(q => q.isError);

  const clients: ClientInfoWithServer[] = clientQueries.flatMap((query, index) => {
    const serverId = serverIds[index];
    const serverHost = SERVERS[serverId as keyof typeof SERVERS].host;
    if (query.data?.data) {
      return query.data.data.map(client => ({ ...client, serverHost }));
    }
    return [];
  });

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-dark-600 rounded w-1/3"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-dark-600 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="text-center text-red-400">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <p>无法获取用户列表</p>
        </div>
      </Card>
    );
  }


  const totalUsers = clients.length;

  return (
    <Card hover className="h-full flex flex-col space-y-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-semibold">在线用户</h3>
        <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-sm">
          {totalUsers}
        </span>
      </div>

      {totalUsers === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>暂无用户在线</p>
          <p className="text-sm mt-1">快来加入我们吧！</p>
        </div>
      ) : (
        <div className="space-y-3 flex-grow overflow-y-auto max-h-[600px]">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg border border-dark-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{client.nickname}</span>
                  {client.nickname.includes('Admin') && (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" />
                    <span>{client.channelName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>@{client.serverHost}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>{client.country || '未知'}</span>
                    </div>
                    <span>在线 {formatUptime(client.connectionTime)}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <div>{client.platform}</div>
                <div>{client.version}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="border-t border-dark-600 pt-3">
        <div className="text-sm text-gray-400 text-center">
          实时更新 · 每10秒刷新一次
        </div>
      </div>
    </Card>
  );
};

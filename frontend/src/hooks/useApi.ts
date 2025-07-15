import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query';
import { serverApi, announcementApi, feedbackApi } from '../services/api';
import { UPDATE_INTERVALS } from '../config/constants';
import type { FeedbackForm } from '../types';

// 服务器状态查询 Hook
export const useServerStatus = () => {
  return useQuery({
    queryKey: ['serverStatus'],
    queryFn: () => serverApi.getStatus(),
    refetchInterval: UPDATE_INTERVALS.serverStatus,
    staleTime: 5000,
  });
};

// 在线用户查询 Hook
export const useClients = (serverIds: string[]) => {
  return useQueries({
    queries: serverIds.map(serverId => ({
      queryKey: ['clients', serverId],
      queryFn: () => serverApi.getClients(serverId),
      refetchInterval: UPDATE_INTERVALS.userList,
      staleTime: 5000,
      enabled: !!serverId,
    })),
  });
};

// 频道信息查询 Hook
export const useChannels = (serverId: string) => {
  return useQuery({
    queryKey: ['channels', serverId],
    queryFn: () => serverApi.getChannels(serverId),
    refetchInterval: UPDATE_INTERVALS.userList,
    staleTime: 10000,
    enabled: !!serverId, // 只有当 serverId 存在时才执行查询
  });
};

// 服务器统计查询 Hook
export const useServerStats = (serverId: string) => {
  return useQuery({
    queryKey: ['serverStats', serverId],
    queryFn: () => serverApi.getStats(serverId),
    refetchInterval: UPDATE_INTERVALS.statistics,
    staleTime: 30000,
    enabled: !!serverId,
  });
};

// 历史统计数据查询 Hook
export const useHistoryStats = (serverId: string, period: string = '24h') => {
  return useQuery({
    queryKey: ['historyStats', serverId, period],
    queryFn: () => serverApi.getHistoryStats(serverId, period),
    staleTime: 60000,
    enabled: !!serverId,
  });
};

// 公告查询 Hook
export const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => announcementApi.getAnnouncements(),
    staleTime: 300000, // 5分钟
  });
};

// 反馈提交 Hook
export const useFeedback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (feedback: FeedbackForm) => feedbackApi.submitFeedback(feedback),
    onSuccess: () => {
      // 可以在这里添加成功后的操作
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
};

// 组合多个服务器状态的 Hook
export const useAllServersStatus = () => {
  const { data: statusData, isLoading, isError, refetch } = useServerStatus();
  
  const servers = statusData?.data || [];
  
  return {
    servers,
    isLoading,
    isError,
    refetchAll: refetch,
  };
};

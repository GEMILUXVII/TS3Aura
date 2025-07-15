import React from 'react';
import { motion } from 'framer-motion';
import { Info, Server, Users, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';

export const WelcomeCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-primary-600/10 to-accent-green/10 border-primary-600/30">
      <div className="space-y-6">
        {/* 欢迎标题 */}
        <div className="text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold gradient-text mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            欢迎来到 KCPO.US | Keep Cool, Play On
          </motion.h2>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            我们拥有两个互联的服务器节点，推荐您通过以下地址连接，以获得最稳定快速的体验
          </motion.p>
        </div>

        {/* 功能介绍网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            className="bg-dark-700/30 rounded-lg p-4 text-center space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Server className="w-8 h-8 text-primary-400 mx-auto" />
            <h3 className="font-semibold text-white">双节点服务</h3>
            <p className="text-sm text-gray-400">
              两个高性能服务器节点互联，确保连接稳定性
            </p>
          </motion.div>

          <motion.div
            className="bg-dark-700/30 rounded-lg p-4 text-center space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Users className="w-8 h-8 text-accent-green mx-auto" />
            <h3 className="font-semibold text-white">临时频道</h3>
            <p className="text-sm text-gray-400">
              轻松创建私人临时频道，满足不同需求
            </p>
          </motion.div>

          <motion.div
            className="bg-dark-700/30 rounded-lg p-4 text-center space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MessageSquare className="w-8 h-8 text-accent-orange mx-auto" />
            <h3 className="font-semibold text-white">权限系统</h3>
            <p className="text-sm text-gray-400">
              完善的权限管理，建议登录myTeamSpeak账户
            </p>
          </motion.div>

          <motion.div
            className="bg-dark-700/30 rounded-lg p-4 text-center space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Info className="w-8 h-8 text-blue-400 mx-auto" />
            <h3 className="font-semibold text-white">技术支持</h3>
            <p className="text-sm text-gray-400">
              专业技术支持团队，快速响应用户问题
            </p>
          </motion.div>
        </div>

        {/* 使用说明 */}
        <div className="bg-dark-700/20 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-400" />
            频道使用说明
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">•</span>
              <span>前往频道列表中的 <strong className="text-accent-orange">"Join to Create / 点击创建私人临时频道"</strong> 即可自动获得一个私人子频道</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">•</span>
              <span>遇到任何形式的骚扰或违规行为，请立即通过<strong>右键菜单中的"提交投诉"</strong>功能向管理员举报</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-400 mt-1">•</span>
              <span>重要通知将在QQ群组内发布，建议加入群组获取最新信息</span>
            </li>
          </ul>
        </div>

        {/* 底部标语 */}
        <motion.div
          className="text-center py-4 border-t border-dark-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-accent-green font-medium italic">
            "Thank you for joining us. Remember: Keep Cool, Play On."
          </p>
        </motion.div>
      </div>
    </Card>
  );
};

import React from 'react';
import { MessageSquare, ExternalLink, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CONTACT_INFO } from '../../config/constants';

interface ContactCardProps {
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ className }) => {
  const handleQQGroup = () => {
    window.open(`https://qm.qq.com/cgi-bin/qm/qr?k=&jump_from=webapi&authKey=&_wv=1027&group_code=${CONTACT_INFO.qqGroup}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(CONTACT_INFO.telegram, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:${CONTACT_INFO.email}`, '_blank');
  };

  return (
    <Card hover className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-semibold">联系我们</h3>
      </div>

      <div className="space-y-4">
        {/* QQ 群组 */}
        <div className="space-y-2">
          <h4 className="font-medium text-white flex items-center gap-2">
            <Users className="w-4 h-4" />
            QQ 交流群
          </h4>
          <div className="bg-dark-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">群号: {CONTACT_INFO.qqGroup}</span>
              <Button size="sm" variant="secondary" onClick={handleQQGroup}>
                <ExternalLink className="w-4 h-4" />
                加入群聊
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              重要通知和技术支持都会在QQ群内发布
            </p>
          </div>
        </div>

        {/* Telegram */}
        <div className="space-y-2">
          <h4 className="font-medium text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Telegram 联系
          </h4>
          <div className="bg-dark-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">管理员私聊</span>
              <Button size="sm" variant="secondary" onClick={handleTelegram}>
                <ExternalLink className="w-4 h-4" />
                联系管理员
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              快速响应技术问题和建议
            </p>
          </div>
        </div>

        {/* 邮箱联系 */}
        <div className="space-y-2">
          <h4 className="font-medium text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            邮箱联系
          </h4>
          <div className="bg-dark-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{CONTACT_INFO.email}</span>
              <Button size="sm" variant="secondary" onClick={handleEmail}>
                <ExternalLink className="w-4 h-4" />
                发送邮件
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              正式问题反馈和合作咨询
            </p>
          </div>
        </div>

        {/* 管理员QQ */}
        <div className="space-y-2">
          <h4 className="font-medium text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            管理员 QQ
          </h4>
          <div className="bg-dark-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">QQ: {CONTACT_INFO.qq}</span>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => window.open(`tencent://message/?uin=${CONTACT_INFO.qq}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                添加好友
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              直接联系服务器管理员
            </p>
          </div>
        </div>
      </div>

      {/* 服务声明 */}
      <div className="border-t border-dark-600 pt-4">
        <div className="bg-accent-green/10 border border-accent-green/30 rounded-lg p-3">
          <p className="text-sm text-accent-green">
            💡 本服务器为公益项目，完全免费使用
          </p>
        </div>
      </div>
    </Card>
  );
};

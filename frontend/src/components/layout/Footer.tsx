import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../config/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900/80 backdrop-blur-sm border-t border-dark-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">KCPO.US</h3>
            <p className="text-gray-400 mb-4">
              免费公益 TeamSpeak 语音服务器<br />
              为游戏玩家提供稳定的语音通讯体验
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>by KCPO.US Team</span>
            </div>
          </motion.div>

          {/* 快速链接 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#status" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  服务器状态
                </a>
              </li>
              <li>
                <a 
                  href="#users" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  在线用户
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  联系我们
                </a>
              </li>
              <li>
                <a 
                  href="#feedback" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  问题反馈
                </a>
              </li>
            </ul>
          </motion.div>

          {/* 联系方式 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">联系我们</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tencent://message/?uin=${CONTACT_INFO.qq}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>QQ: {CONTACT_INFO.qq}</span>
              </a>
              <a
                href={CONTACT_INFO.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Telegram</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>QQ群: {CONTACT_INFO.qqGroup}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 版权信息 */}
        <motion.div
          className="border-t border-dark-700 pt-6 mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 KCPO.US. All rights reserved. | Keep Cool, Play On.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                Powered by TeamSpeak
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">服务器在线</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

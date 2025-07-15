import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

export const Header: React.FC = () => {

  return (
    <header className="relative">
      {/* 导航栏 */}
      <nav className="bg-dark-800/80 backdrop-blur-sm border-b border-dark-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Radio className="w-8 h-8 text-primary-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">KCPO.US</h1>
                <p className="text-xs text-gray-400">TeamSpeak Server</p>
              </div>
            </motion.div>

            {/* 导航链接 */}
            <motion.div
              className="hidden md:flex items-center gap-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#status" className="text-gray-300 hover:text-primary-400 transition-colors">
                服务器状态
              </a>
              <a href="#users" className="text-gray-300 hover:text-primary-400 transition-colors">
                在线用户
              </a>
              <a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                联系我们
              </a>
            </motion.div>


          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600/20 to-accent-green/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">KCPO.US</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              Keep Cool, Play On
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              欢迎来到 KCPO.US TeamSpeak 公益服务器 - 永久免费的语音通讯服务
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

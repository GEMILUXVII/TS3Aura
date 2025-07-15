# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# 安装 dumb-init (用于信号处理)
RUN apk add --no-cache dumb-init

# 创建用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 复制包文件
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 创建日志目录
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# 切换到非root用户
USER nodejs

# 暴露端口
EXPOSE 3001

# 启动应用
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]

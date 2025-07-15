#!/bin/bash

# 不使用 Docker 的部署脚本
# 适用于 Ubuntu/Debian 系统

# 当任何命令失败时，立即退出脚本
set -e

# --- 配置 ---
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_PORT=3001 # 后端运行的端口

# --- 函数 ---
log() {
  echo -e "\033[32m[$(date +'%Y-%m-%d %H:%M:%S')] $1\033[0m"
}

check_command() {
  if ! command -v $1 &> /dev/null; then
    echo -e "\033[31m错误: 命令 '$1' 未找到。请先安装它。\033[0m"
    exit 1
  fi
}

# --- 主逻辑 ---

log "开始部署 (非 Docker 模式)..."

# 1. 系统更新和依赖安装
log "更新系统并安装依赖 (Node.js, npm, Nginx, Redis, PM2)..."
sudo apt-get update
sudo apt-get install -y nginx redis-server

# 安装 Node.js (推荐使用 nvm 或 nodesource)
if ! command -v node &> /dev/null; then
  log "安装 Node.js v18..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# 安装 PM2 进程管理器
if ! command -v pm2 &> /dev/null; then
  log "安装 PM2..."
  sudo npm install -g pm2
fi

# 2. 启动并设置 Redis
log "启动并设置 Redis 开机自启..."
sudo systemctl enable redis-server
sudo systemctl start redis-server

# 3. 部署后端
log "部署后端服务..."
cd "$BACKEND_DIR"
log "安装后端依赖..."
npm install

log "构建后端代码..."
npm run build

# 配置 .env 文件
if [ ! -f ".env" ]; then
  log "创建 .env 文件..."
  cp .env.example .env
  echo -e "\033[33m重要: 请务必修改 '$BACKEND_DIR/.env' 文件，填入正确的配置信息。\033[0m"
fi

log "使用 PM2 启动后端服务..."
# --name 指定应用名称，方便管理
# -- start 后面的参数会传递给 npm
pm2 start npm --name ts3aura-api -- run start

# 4. 部署前端
log "部署前端应用..."
cd "$FRONTEND_DIR"
log "安装前端依赖..."
npm install

log "构建前端静态文件..."
npm run build

# 5. 配置 Nginx
log "配置 Nginx 作为反向代理..."

# 创建一个新的 Nginx 配置文件
NGINX_CONF="/etc/nginx/sites-available/ts3aura"

# 注意：这里的 'your_domain.com' 需要替换成您的真实域名
# 如果没有域名，可以直接用服务器 IP 地址，但无法配置 SSL
cat <<EOF | sudo tee "$NGINX_CONF"
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    # 前端静态文件
    location / {
        root $FRONTEND_DIR/dist;
        try_files \$uri /index.html;
    }

    # 后端 API 代理
    location /api/ {
        proxy_pass http://localhost:$BACKEND_PORT/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 启用新的 Nginx 配置
if [ ! -L "/etc/nginx/sites-enabled/ts3aura" ]; then
  sudo ln -s "$NGINX_CONF" /etc/nginx/sites-enabled/
fi

# 测试并重启 Nginx
log "测试并重启 Nginx..."
sudo nginx -t
sudo systemctl restart nginx

# 6. 保存 PM2 进程列表，以便服务器重启后自动恢复
log "设置 PM2 开机自启..."
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $(whoami) --hp /home/$(whoami)

log "\033[32m部署成功完成！\033[0m"
echo -e "\033[33m请注意：\033[0m"
echo "1. 您需要将 '$NGINX_CONF' 文件中的 'your_domain.com' 替换为您的真实域名。"
echo "2. 您需要手动配置 '$BACKEND_DIR/.env' 文件。"
echo "3. 如果您有域名，建议使用 'certbot' 配置 SSL/TLS 加密。"
echo "4. 您可以通过 'pm2 list' 查看后端服务状态，'pm2 logs ts3aura-api' 查看日志。"
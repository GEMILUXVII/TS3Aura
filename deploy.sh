#!/bin/bash

# KCPO.US TeamSpeak 服务器部署脚本
# 适用于 Ubuntu 服务器

set -e

echo "🚀 开始部署 KCPO.US TeamSpeak 网页项目..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}请使用 root 权限运行此脚本${NC}"
    exit 1
fi

# 更新系统
echo -e "${BLUE}📦 更新系统包...${NC}"
apt update && apt upgrade -y

# 安装必要的软件
echo -e "${BLUE}📦 安装必要软件...${NC}"
apt install -y curl wget git ufw nginx certbot python3-certbot-nginx

# 安装 Docker
echo -e "${BLUE}🐳 安装 Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    rm get-docker.sh
fi

# 安装 Docker Compose
echo -e "${BLUE}🐳 安装 Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# 创建项目目录
PROJECT_DIR="/opt/kcpo-teamspeak"
echo -e "${BLUE}📁 创建项目目录: $PROJECT_DIR${NC}"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# 克隆项目 (如果是从 Git 仓库部署)
# echo -e "${BLUE}📥 克隆项目代码...${NC}"
# git clone https://github.com/your-repo/kcpo-teamspeak.git .

# 复制环境配置文件
echo -e "${BLUE}⚙️ 配置环境变量...${NC}"
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${YELLOW}请编辑 backend/.env 文件配置您的 TeamSpeak 服务器信息${NC}"
    read -p "按回车键继续..."
fi

# 配置防火墙
echo -e "${BLUE}🔥 配置防火墙...${NC}"
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3001/tcp
ufw --force enable

# 创建 SSL 证书目录
echo -e "${BLUE}🔒 创建 SSL 证书目录...${NC}"
mkdir -p nginx/ssl

# 申请 SSL 证书 (需要域名已解析到服务器)
read -p "是否申请 Let's Encrypt SSL 证书? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "请输入您的域名 (例如: kcpo.us): " DOMAIN
    certbot certonly --nginx -d $DOMAIN
    ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/kcpo.us.crt
    ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/kcpo.us.key
fi

# 构建和启动服务
echo -e "${BLUE}🏗️ 构建和启动服务...${NC}"
docker-compose -f docker/docker-compose.yml up -d --build

# 等待服务启动
echo -e "${BLUE}⏳ 等待服务启动...${NC}"
sleep 30

# 检查服务状态
echo -e "${BLUE}🔍 检查服务状态...${NC}"
docker-compose -f docker/docker-compose.yml ps

# 测试 API 连接
echo -e "${BLUE}🧪 测试 API 连接...${NC}"
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 后端 API 服务正常${NC}"
else
    echo -e "${RED}❌ 后端 API 服务异常${NC}"
fi

# 设置自动更新
echo -e "${BLUE}🔄 设置自动更新...${NC}"
cat > /etc/cron.d/kcpo-update << EOF
# 每天凌晨 2 点检查更新
0 2 * * * root cd $PROJECT_DIR && docker-compose -f docker/docker-compose.yml pull && docker-compose -f docker/docker-compose.yml up -d
EOF

# 设置日志轮转
echo -e "${BLUE}📝 设置日志轮转...${NC}"
cat > /etc/logrotate.d/kcpo-teamspeak << EOF
$PROJECT_DIR/backend/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF

# 创建管理脚本
echo -e "${BLUE}🛠️ 创建管理脚本...${NC}"
cat > /usr/local/bin/kcpo-manage << 'EOF'
#!/bin/bash
PROJECT_DIR="/opt/kcpo-teamspeak"
cd $PROJECT_DIR

case "$1" in
    start)
        docker-compose -f docker/docker-compose.yml up -d
        ;;
    stop)
        docker-compose -f docker/docker-compose.yml stop
        ;;
    restart)
        docker-compose -f docker/docker-compose.yml restart
        ;;
    logs)
        docker-compose -f docker/docker-compose.yml logs -f
        ;;
    status)
        docker-compose -f docker/docker-compose.yml ps
        ;;
    update)
        docker-compose -f docker/docker-compose.yml pull
        docker-compose -f docker/docker-compose.yml up -d
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|status|update}"
        exit 1
        ;;
esac
EOF

chmod +x /usr/local/bin/kcpo-manage

echo -e "${GREEN}🎉 部署完成!${NC}"
echo -e "${GREEN}✅ 项目已部署到: $PROJECT_DIR${NC}"
echo -e "${GREEN}✅ 网站地址: http://localhost${NC}"
echo -e "${GREEN}✅ API 地址: http://localhost:3001${NC}"
echo
echo -e "${BLUE}📚 管理命令:${NC}"
echo -e "  启动服务: ${YELLOW}kcpo-manage start${NC}"
echo -e "  停止服务: ${YELLOW}kcpo-manage stop${NC}"
echo -e "  重启服务: ${YELLOW}kcpo-manage restart${NC}"
echo -e "  查看日志: ${YELLOW}kcpo-manage logs${NC}"
echo -e "  查看状态: ${YELLOW}kcpo-manage status${NC}"
echo -e "  更新服务: ${YELLOW}kcpo-manage update${NC}"
echo
echo -e "${YELLOW}⚠️ 请确保:${NC}"
echo -e "  1. 编辑 backend/.env 文件配置 TeamSpeak 服务器信息"
echo -e "  2. 确保域名已解析到此服务器"
echo -e "  3. 配置 TeamSpeak 服务器允许 ServerQuery 连接"
echo
echo -e "${GREEN}🎯 Keep Cool, Play On!${NC}"

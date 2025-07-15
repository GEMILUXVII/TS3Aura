#!/bin/bash

# 当任何命令失败时，立即退出脚本
set -e

# --- 配置 ---
# Git 仓库地址 (如果您的代码在 Git 仓库中)
# GIT_REPO_URL="YOUR_GIT_REPO_URL"
# 项目目录
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Docker Compose 文件路径
DOCKER_COMPOSE_FILE="$PROJECT_DIR/docker/docker-compose.yml"

# --- 函数 ---

# 输出带有时间戳和颜色的日志
log() {
  echo -e "\033[32m[$(date +'%Y-%m-%d %H:%M:%S')] $1\033[0m"
}

# 检查必需的命令是否存在
check_command() {
  if ! command -v $1 &> /dev/null; then
    echo -e "\033[31m错误: 命令 '$1' 未找到。请先安装它。\033[0m"
    exit 1
  fi
}

# --- 主逻辑 ---

log "开始部署..."

# 1. 检查依赖
log "检查依赖 (git, docker, docker-compose)..."
check_command git
check_command docker
check_command docker-compose

# 2. 更新代码 (如果使用 Git)
# log "从 Git 仓库拉取最新代码..."
# if [ -d ".git" ]; then
#   git pull
# else
#   log "警告: 当前目录不是一个 Git 仓库。跳过 'git pull'。"
#   # 如果需要，可以从这里克隆
#   # git clone "$GIT_REPO_URL" "$PROJECT_DIR"
#   # cd "$PROJECT_DIR"
# fi

# 3. 进入项目目录
cd "$PROJECT_DIR"
log "当前工作目录: $(pwd)"

# 4. 使用 Docker Compose 构建和启动服务
log "使用 Docker Compose 启动服务..."
if [ -f "$DOCKER_COMPOSE_FILE" ]; then
  # --force-recreate: 强制重新创建容器，即使配置没有改变
  # --build: 强制重新构建镜像
  # -d: 在后台运行
  sudo docker-compose -f "$DOCKER_COMPOSE_FILE" up -d --build --force-recreate
else
  echo -e "\033[31m错误: Docker Compose 文件未找到: $DOCKER_COMPOSE_FILE\033[0m"
  exit 1
fi

# 5. 清理无用的 Docker 镜像（可选）
log "清理无用的 Docker 镜像..."
sudo docker image prune -f

log "\033[32m部署成功完成！\033[0m"

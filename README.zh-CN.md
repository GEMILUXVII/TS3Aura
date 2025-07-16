# <div align="center"> TS3Aura </div>

<div align="center"> <em> 一个现代、美观、功能丰富的 TeamSpeak 3 服务器 Web 查看器 </em> </div>

<div align="center"> <b> 本项目 30% 由 Gemini 2.5 Pro 构建 </b> </div>

<br>

<div align="center">
  <a href="https://github.com/GEMILUXVII/TS3Aura/releases">
    <img src="https://img.shields.io/badge/version-v1.0.0-9644F4?style=for-the-badge" alt="Version"></a>
  <a href="https://github.com/GEMILUXVII/TS3Aura/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-E53935?style=for-the-badge" alt="License"></a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Version"></a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Version"></a>
</div>

<div align="center">
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Backend-Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Backend Framework"></a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Frontend-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Frontend Tooling"></a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Deploy-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Deployment"></a>
</div>

<br>

<p align="center">
  <img src="https://i.imgur.com/cAnFNFL.png" alt="项目预览" width="800"/>
</p>

<p align="center">
  <a href="#-功能特性"><strong>探索功能 »</strong></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GEMILUXVII/TS3Aura/issues">报告 Bug</a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GEMILUXVII/TS3Aura/issues">请求功能</a>
</p>

## 简介

**TS3Aura** 是一个前后端分离的 Web 应用，旨在为 TeamSpeak 3 服务器提供一个优雅的现代化界面。它允许用户实时查看服务器状态、在线用户、频道结构等信息，并为服务器管理员提供了一个展示其社区的平台。

本项目采用前后端分离架构，易于部署和扩展。

## 功能特性

- **实时服务器状态**: 动态展示服务器信息、延迟和在线人数。
- **频道用户**: 清晰展示频道和其中的用户。
- **响应式设计**: 在桌面和移动设备上均有良好体验。
- **快速加载**: 采用 Vite 和 React Query 进行性能优化。
- **Docker 化部署**: 提供 Dockerfile 和 docker-compose 配置，实现一键部署。

## 技术栈

- **前端**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Query](https://tanstack.com/query/v5)
- **后端**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ts3-nodejs-library](https://github.com/multivit4min/TS3-NodeJS-Library)
- **部署**:
  - [Docker](https://www.docker.com/)
  - [Nginx](https://www.nginx.com/) (推荐作为反向代理)

## 快速开始

请确保您的系统已安装 [Node.js](https://nodejs.org/) (v18+) 和 [pnpm](https://pnpm.io/)。

1.  **克隆项目**

    ```sh
    git clone https://github.com/GEMILUXVII/TS3Aura.git
    cd TS3Aura
    ```

2.  **安装依赖**
    项目为 monorepo 结构，推荐使用 `pnpm` 安装依赖。

    ```sh
    pnpm install
    ```

3.  **环境配置**
    后端服务需要连接到您的 TeamSpeak 服务器的 ServerQuery 接口。

    复制 `backend` 目录下的 `.env.example` 文件为 `.env`：

    ```sh
    cp backend/.env.example backend/.env
    ```

    然后，编辑 `backend/.env` 文件，填入您的 ServerQuery 凭据：

    ```dotenv
    # 应用端口
    PORT=3001

    # TeamSpeak ServerQuery 配置
    TS_HOST=127.0.0.1
    TS_PORT=9987
    TS_QUERY_PORT=10011
    TS_QUERY_USER=serveradmin
    TS_QUERY_PASS=your_secret_password

    # 虚拟服务器 ID (如果您的 TS 服务器上有多个虚拟服务器)
    TS_SERVER_ID=1
    ```

4.  **运行项目**
    您可以同时启动前端和后端开发服务器：

    ```sh
    # 在项目根目录运行 (如果根目录的 package.json 配置了脚本)
    pnpm dev
    ```

    或者分开启动：

    ```sh
    # 启动后端 API
    pnpm --filter kcpo-teamspeak-backend dev

    # 启动前端 Web
    pnpm --filter kcpo-teamspeak-frontend dev
    ```

    - 前端访问: `http://localhost:5173`
    - 后端 API: `http://localhost:3001`

## 部署

我们强烈推荐使用 Docker 进行生产环境部署。

1.  **配置环境变量**: 确保服务器上的 `backend/.env` 文件已正确配置。
2.  **构建并运行**: 使用 `docker-compose` 一键启动。

    ```sh
    docker-compose up --build -d
    ```

    此命令将构建前端和后端的镜像，并以后台模式启动所有服务。前端将由 Nginx 提供服务，并代理后端的 API 请求。

    更多细节，例如 Nginx 配置和 SSL，请参考 `docker-compose.yml` 和 `nginx/nginx.conf` 文件。

## 贡献

欢迎任何形式的贡献！如果您有好的想法或发现了 Bug，请随时提交 [Pull Request](https://github.com/GEMILUXVII/TS3Aura/pulls) 或创建 [Issue](https://github.com/GEMILUXVII/TS3Aura/issues)。

我们遵循标准的 `fork-and-pull` Git 工作流。

1.  **Fork** 本项目
2.  创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  打开一个 Pull Request

## 许可证

本项目基于 MIT 许可证。详情请见 `LICENSE` 文件。

---

<p align="center">
  由爱和代码构建
</p>

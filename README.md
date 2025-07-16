# <div align="center"> TS3Aura </div>

<div align="center"> <em> A modern, beautiful, and feature-rich TeamSpeak 3 Server Web Viewer </em> </div>

<div align="center"> <b> 30% of this project was built by Gemini 2.5 Pro </b> </div>

<br>

<div align="center">
  <a href="./README.zh-CN.md">简体中文</a>
</div>

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
  <img src="https://i.imgur.com/cAnFNFL.png" alt="Project Preview" width="800"/>
</p>

<p align="center">
  <a href="#-features"><strong>Explore Features »</strong></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GEMILUXVII/TS3Aura/issues">Report Bug</a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GEMILUXVII/TS3Aura/issues">Request Feature</a>
</p>

## Introduction

**TS3Aura** is a front-end and back-end separated web application designed to provide an elegant and modern interface for TeamSpeak 3 servers. It allows users to view server status, online users, channel structure, and other information in real time, and provides a platform for server administrators to showcase their community.

This project uses a front-end and back-end separated architecture, which is easy to deploy and expand.

## Features

- **Real-time Server Status**: Dynamically display server information, latency, and online user count.
- **Channels and Users**: Clearly display channels and the users within them.
- **Responsive Design**: Provides a great experience on both desktop and mobile devices.
- **Fast Loading**: Optimized for performance with Vite and React Query.
- **Dockerized Deployment**: Provides Dockerfile and docker-compose configurations for one-click deployment.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Query](https://tanstack.com/query/v5)
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ts3-nodejs-library](https://github.com/multivit4min/TS3-NodeJS-Library)
- **Deployment**:
  - [Docker](https://www.docker.com/)
  - [Nginx](https://www.nginx.com/) (recommended as a reverse proxy)

## Quick Start

Please ensure your system has [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

1.  **Clone the project**

    ```sh
    git clone https://github.com/GEMILUXVII/TS3Aura.git
    cd TS3Aura
    ```

2.  **Install dependencies**
    The project is a monorepo, it is recommended to use `pnpm` to install dependencies.

    ```sh
    pnpm install
    ```

3.  **Configure the environment**
    The backend service needs to connect to your TeamSpeak server's ServerQuery interface.

    Copy the `.env.example` file in the `backend` directory to `.env`:

    ```sh
    cp backend/.env.example backend/.env
    ```

    Then, edit the `backend/.env` file and fill in your ServerQuery credentials:

    ```dotenv
    # Application Port
    PORT=3001

    # TeamSpeak ServerQuery Configuration
    TS_HOST=127.0.0.1
    TS_PORT=9987
    TS_QUERY_PORT=10011
    TS_QUERY_USER=serveradmin
    TS_QUERY_PASS=your_secret_password

    # Virtual Server ID (if you have multiple virtual servers on your TS server)
    TS_SERVER_ID=1
    ```

4.  **Run the project**
    You can start the front-end and back-end development servers at the same time:

    ```sh
    # Run in the project root directory (if the package.json in the root directory has a script configured)
    pnpm dev
    ```

    Or start them separately:

    ```sh
    # Start the backend API
    pnpm --filter kcpo-teamspeak-backend dev

    # Start the frontend Web
    pnpm --filter kcpo-teamspeak-frontend dev
    ```

    - Frontend access: `http://localhost:5173`
    - Backend API: `http://localhost:3001`

## Deployment

We strongly recommend using Docker for production deployment.

1.  **Configure environment variables**: Ensure that the `backend/.env` file on the server is configured correctly.
2.  **Build and run**: Use `docker-compose` to start with one click.

    ```sh
    docker-compose up --build -d
    ```

    This command will build the front-end and back-end images and start all services in the background. The front end will be served by Nginx and will proxy the backend's API requests.

    For more details, such as Nginx configuration and SSL, please refer to the `docker-compose.yml` and `nginx/nginx.conf` files.

## Contributing

Contributions of any kind are welcome! If you have a good idea or find a bug, please feel free to submit a [Pull Request](https://github.com/GEMILUXVII/TS3Aura/pulls) or create an [Issue](https://github.com/GEMILUXVII/TS3Aura/issues).

We follow the standard `fork-and-pull` Git workflow.

1.  **Fork** this project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<p align="center">
  Built with love and code
</p>
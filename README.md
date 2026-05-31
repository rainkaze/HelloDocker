# HelloDocker

这是一个前后端分离的 Docker 学习项目。

- `backend/`：Python 3.13 + uv + FastAPI
- `frontend/`：静态页面 + Python 标准库 `http.server`
- 根目录：Docker Compose、环境变量和项目说明

## 目录结构

```text
.
├── .env
├── .env.example
├── compose.yaml
├── compose.prod.yaml
├── backend/
│   ├── Dockerfile
│   ├── pyproject.toml
│   ├── uv.lock
│   └── app/
│       ├── __init__.py
│       └── main.py
└── frontend/
    ├── Dockerfile
    ├── index.html
    ├── styles.css
    └── app.js
```

## 环境变量

根目录已经创建 `.env`：

```env
COMPOSE_PROJECT_NAME=hellodocker
APP_NAME=HelloDocker
APP_ENV=development
BACKEND_PORT=8000
BACKEND_PUBLIC_PORT=8000
FRONTEND_PORT=8080
BACKEND_IMAGE=hellodocker-backend:local
FRONTEND_IMAGE=hellodocker-frontend:local
```

说明：

- `BACKEND_PORT`：后端容器映射到宿主机的端口。
- `BACKEND_PUBLIC_PORT`：前端页面访问后端时使用的端口。
- `FRONTEND_PORT`：前端页面端口。
- `BACKEND_IMAGE` / `FRONTEND_IMAGE`：本地或远程镜像名。

## 本地启动

```powershell
docker compose up --build
```

打开前端：

```text
http://localhost:8080
```

打开后端接口：

```text
http://localhost:8000/api/health
```

页面里的 Backend 显示 `ok`，就说明前端容器和后端容器都启动成功。

## 常用命令

查看容器：

```powershell
docker compose ps
```

查看日志：

```powershell
docker compose logs -f
```

只看后端日志：

```powershell
docker compose logs -f backend
```

只看前端日志：

```powershell
docker compose logs -f frontend
```

停止：

```powershell
docker compose down
```

## 单独构建镜像

```powershell
docker build -t hellodocker-backend:local ./backend
docker build -t hellodocker-frontend:local ./frontend
```

## 推送到 Docker Hub

```powershell
$env:DOCKER_USER = "your-dockerhub-name"
$env:APP_TAG = "0.1.0"

docker build -t "$env:DOCKER_USER/hellodocker-backend:$env:APP_TAG" ./backend
docker build -t "$env:DOCKER_USER/hellodocker-frontend:$env:APP_TAG" ./frontend

docker login
docker push "$env:DOCKER_USER/hellodocker-backend:$env:APP_TAG"
docker push "$env:DOCKER_USER/hellodocker-frontend:$env:APP_TAG"
```

## pull 后启动

在另一台机器上准备 `.env` 和 `compose.prod.yaml`。

把 `.env` 里的镜像名改成远程镜像：

```env
BACKEND_IMAGE=your-dockerhub-name/hellodocker-backend:0.1.0
FRONTEND_IMAGE=your-dockerhub-name/hellodocker-frontend:0.1.0
```

然后运行：

```powershell
docker compose -f compose.prod.yaml pull
docker compose -f compose.prod.yaml up -d
```

打开：

```text
http://localhost:8080
```

## PyCharm 建议

- 把项目根目录作为 PyCharm Project 打开。
- 后端代码主要看 `backend/app/main.py`。
- 后端依赖主要看 `backend/pyproject.toml`。
- 前端代码主要看 `frontend/index.html`、`frontend/app.js`、`frontend/styles.css`。
- Docker 全流程先在 PyCharm Terminal 里跑命令，比先用 UI 更容易理解。

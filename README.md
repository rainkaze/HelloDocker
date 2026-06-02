# HelloDocker

HelloDocker 是一个用于学习 Docker、Docker Compose 和基础 CI/CD 的前后端分离示例项目。

- `backend/`: Python 3.13 + uv + FastAPI。
- `frontend/`: 静态页面 + Python 标准库 `http.server`。
- 根目录: Docker Compose、环境变量示例、GitHub Actions 和项目说明。

## 目录结构

```text
.
├── .env.example
├── compose.yaml
├── compose.prod.yaml
├── .github/
│   ├── workflows/
│   │   └── docker.yml
│   ├── ISSUE_TEMPLATE/
│   ├── pull_request_template.md
│   ├── CODEOWNERS
│   └── dependabot.yml
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

复制示例文件：

```powershell
Copy-Item .env.example .env
```

`.env.example`:

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

变量说明：

- `BACKEND_PORT`: 后端容器映射到宿主机的端口。
- `BACKEND_PUBLIC_PORT`: 前端页面在浏览器中访问后端时使用的端口。
- `FRONTEND_PORT`: 前端页面映射到宿主机的端口。
- `BACKEND_IMAGE` / `FRONTEND_IMAGE`: 本地或远程镜像名称。

## 本地启动

```powershell
docker compose -f compose.yaml up --build
```

访问前端：

```text
http://localhost:8080
```

访问后端健康检查：

```text
http://localhost:8000/api/health
```

页面中的 Backend 状态显示 `ok`，说明前端容器和后端容器都已正常工作。

## 常用命令

校验 Compose 配置：

```powershell
docker compose -f compose.yaml config
```

查看容器：

```powershell
docker compose -f compose.yaml ps
```

查看日志：

```powershell
docker compose -f compose.yaml logs -f
```

只看后端日志：

```powershell
docker compose -f compose.yaml logs -f backend
```

只看前端日志：

```powershell
docker compose -f compose.yaml logs -f frontend
```

停止：

```powershell
docker compose -f compose.yaml down
```

## 单独构建镜像

```powershell
docker build -t hellodocker-backend:local ./backend
docker build -t hellodocker-frontend:local ./frontend
```

## 推送到 Docker Hub

本地手动推送示例：

```powershell
$env:DOCKER_USER = "your-dockerhub-name"
$env:APP_TAG = "0.1.0"

docker build -t "$env:DOCKER_USER/hellodocker-backend:$env:APP_TAG" ./backend
docker build -t "$env:DOCKER_USER/hellodocker-frontend:$env:APP_TAG" ./frontend

docker login
docker push "$env:DOCKER_USER/hellodocker-backend:$env:APP_TAG"
docker push "$env:DOCKER_USER/hellodocker-frontend:$env:APP_TAG"
```

## GitHub Actions CI/CD

当前工作流文件：

```text
.github/workflows/docker.yml
```

触发规则：

- Pull Request: 构建镜像并执行冒烟测试，不推送 Docker Hub。
- Push 到 `master`: 测试通过后推送 `master` 和短 SHA 标签镜像。
- Push `v*.*.*` 标签: 测试通过后推送版本标签和 `latest`。

需要在 GitHub Actions 中配置：

- `DOCKERHUB_USERNAME`: GitHub Actions variable 或 secret。
- `DOCKERHUB_TOKEN`: GitHub Actions secret，建议使用 Docker Hub access token。

## 发布版本

创建并推送版本标签：

```powershell
git tag v0.1.0
git push github v0.1.0
```

发布后会生成类似镜像：

```text
your-dockerhub-name/hellodocker-backend:0.1.0
your-dockerhub-name/hellodocker-backend:0.1
your-dockerhub-name/hellodocker-backend:latest
your-dockerhub-name/hellodocker-frontend:0.1.0
your-dockerhub-name/hellodocker-frontend:0.1
your-dockerhub-name/hellodocker-frontend:latest
```

## 使用远程镜像启动

在另一台机器上准备 `.env` 和 `compose.prod.yaml`，将 `.env` 中的镜像名改成 Docker Hub 镜像：

```env
BACKEND_IMAGE=your-dockerhub-name/hellodocker-backend:0.1.0
FRONTEND_IMAGE=your-dockerhub-name/hellodocker-frontend:0.1.0
```

然后运行：

```powershell
docker compose -f compose.prod.yaml pull
docker compose -f compose.prod.yaml up -d
```

访问：

```text
http://localhost:8080
```

## 协作配置

仓库中包含以下基础配置：

- `.github/ISSUE_TEMPLATE/`: Bug、功能请求和问题模板。
- `.github/pull_request_template.md`: PR 描述和验证清单。
- `.github/CODEOWNERS`: 默认代码负责人。
- `.github/dependabot.yml`: GitHub Actions 和 Dockerfile 依赖更新提醒。
- `AGENTS.md`: 给编码 Agent 和协作者的项目上下文。
- `CONTRIBUTING.md`: 分支、提交和 PR 约定。
- `SECURITY.md`: 密钥和安全问题处理说明。

## PyCharm 建议

- 将项目根目录作为 PyCharm Project 打开。
- 后端代码主要查看 `backend/app/main.py`。
- 后端依赖主要查看 `backend/pyproject.toml`。
- 前端代码主要查看 `frontend/index.html`、`frontend/app.js`、`frontend/styles.css`。
- Docker 相关命令优先在 PyCharm Terminal 中运行，便于理解完整流程。

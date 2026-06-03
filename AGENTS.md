# AGENTS.md

本文档为编码 Agent 和后续协作者提供必要上下文，帮助他们在这个仓库中安全、稳定地工作。

## 项目概览

HelloDocker 是一个小型前后端分离 Docker 学习项目。

- `backend/`: 使用 `uv` 管理的 FastAPI 服务。
- `frontend/`: 使用 Python 标准库 `http.server` 提供服务的静态页面。
- `compose.yaml`: 本地开发用 Compose 文件，会构建镜像。
- `compose.prod.yaml`: 生产风格 Compose 文件，用于拉取已发布镜像并启动。
- `.github/workflows/docker.yml`: GitHub Actions 工作流，用于冒烟测试和 Docker Hub 镜像发布。
- `.venv/`: 使用 `uv` 构建的虚拟环境，名称也为 `HelloDocker`。

## 工作约定

1. 变更应尽量聚焦当前任务。
2. 优先使用小提交，并使用清晰的提交信息。
3. 不要提交 `.env`、虚拟环境、缓存、构建产物或密钥。
4. 本地构建和测试使用 `compose.yaml`。
5. 只有在使用远程镜像拉取并启动时，才使用 `compose.prod.yaml`。

## 常用命令

```powershell
docker compose -f compose.yaml config
docker compose -f compose.yaml up --build
docker compose -f compose.yaml ps
docker compose -f compose.yaml logs -f
docker compose -f compose.yaml down
```

后端健康检查：

```text
http://localhost:8000/api/health
```

前端页面：

```text
http://localhost:8080
```

## CI/CD 说明

- Pull Request 会运行构建和冒烟测试。
- 推送到 `master` 会运行测试，并发布 Docker 镜像。
- 推送匹配 `v*.*.*` 的版本标签会发布版本镜像和 `latest`。
- Docker Hub 凭据需要配置在 GitHub Actions 中：
  - `DOCKERHUB_USERNAME`: variable 或 secret。
  - `DOCKERHUB_TOKEN`: secret。

## 代码风格

- Python 代码使用 4 空格缩进。
- YAML 和 Markdown 在需要缩进时使用 2 空格。
- 文档保持简洁，优先给出可执行命令。
- 优先沿用项目现有模式，不随意引入新工具。

## 安全规则

- 不要打印或提交密钥。
- 不要改写无关文件。
- 除非明确要求，不要修改分支历史。
- 修改 Docker 或 CI 行为前，应同时检查 `compose.yaml`、`compose.prod.yaml` 和 `.github/workflows/docker.yml`。

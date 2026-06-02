# 贡献说明

这个仓库目前是 Docker 学习项目，因此贡献应保持流程简单、可复现、易检查。

## 分支命名

使用简短、能描述工作内容的分支名：

```text
chore/repo-setup
feat/backend-message
fix/frontend-health-check
docs/readme-update
ci/dockerhub-publish
```

## 提交信息

使用紧凑的「emoji + 类型 + 中文摘要」风格：

```text
🎉 init: 初始化项目结构
✨ feat: 添加新功能
🐛 fix: 修复问题
📝 docs: 更新文档
🐳 docker: 调整 Docker 配置
🚀 ci: 完善 CI/CD 流程
🧩 chore: 完善仓库配置
♻️ refactor: 重构代码结构
✅ test: 添加测试用例
```

## 本地验证

创建 Pull Request 前，建议运行：

```powershell
docker compose -f compose.yaml config
docker compose -f compose.yaml up --build
```

然后检查：

```text
http://localhost:8000/api/health
http://localhost:8080
```

停止服务：

```powershell
docker compose -f compose.yaml down
```

## Pull Request

PR 中建议说明：

- 改了什么。
- 为什么要改。
- 如何验证。
- 是否有已知限制。

不要提交密钥、本地 `.env` 文件、虚拟环境或生成的缓存。

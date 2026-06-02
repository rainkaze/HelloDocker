# 安全策略

## 支持版本

这是一个学习项目。除非后续引入 release 分支，安全修复默认面向当前 `master` 分支。

## 报告安全问题

如果发现密钥泄露、凭据泄露或可被利用的漏洞，不要创建公开 Issue。

目前请将安全问题私下反馈给仓库所有者。如果这个仓库后续变成公开生产项目，应在这里补充专门的安全联系方式。

## 密钥处理

- 不要提交 `.env`。
- Docker Hub 凭据应存放在 GitHub Actions secrets 或 variables 中。
- 优先使用 Docker Hub access token，不要使用账号密码。
- 如果 token 出现在日志或提交记录中，应立即轮换。

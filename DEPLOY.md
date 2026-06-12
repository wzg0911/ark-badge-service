# 5 步部署指南（给主人看）

## 步骤 1：在 GitHub 创建空仓库
打开 https://github.com/new
- Repository name: `ark-badge-service`
- Description: `ARK Trust Badge & Registry Service`
- Public（必须，Vercel 免费部署要求）
- **不要勾选** Add a README / .gitignore / license（我们要自己写）
- 点「Create repository」

## 步骤 2：复制本目录到本地
我已经创建在 `/Users/w/.openclaw/workspace/ark-badge-service/`

## 步骤 3：初始化 Git + 提交
打开终端（我会帮你执行）：
```bash
cd /Users/w/.openclaw/workspace/ark-badge-service
git init
git add .
git commit -m "feat: ARK Badge Service Day 1 - core engine + landing page"
git branch -M main
git remote add origin https://github.com/wzg0911/ark-badge-service.git
git push -u origin main
```

## 步骤 4：在 Vercel 导入仓库
回到 Vercel 创建项目页：
1. 点「继续 GitHub」（你已经授权了）
2. 找到 `ark-badge-service` 仓库，点「Import」
3. 框架选 Next.js（自动识别）
4. 保持默认配置，**不要修改 Build Command / Output Directory**
5. 点「Deploy」
6. 等待 1-2 分钟

## 步骤 5：验证
部署完成后会得到一个 URL，类似：
- `https://ark-badge-service.vercel.app`（默认域名）
- `https://ark-feilunxitong.vercel.app`（如果有自定义设置）

**测试 3 个 URL：**
1. 首页：能看到 5 个 Badge
2. Badge：直接访问 `/api/badge?pkg=arkit` 能看到 SVG 图
3. Registry：访问 `/api/registry` 能看到 JSON 数据

## 卡点回退
- 如果 git push 失败：检查网络，国内可能超时，可换 SSH 协议
- 如果 Vercel 构建失败：截图发给我
- 如果想用自定义域名 ark-feilunxitong.vercel.app：Vercel 项目设置 → Domains

# ARK Badge Service

> 信任徽章与开发者注册中心 · 15-Day Sprint Day 1

![ARK Trust](https://ark-feilunxitong.vercel.app/api/badge?pkg=arkit)

## 这是什么

把"我这段代码能不能信"这件事，压缩成 README 里一行 Markdown。

**核心 API：**
- `GET /api/badge?pkg=<name>` — 返回 SVG 徽章（unverified / verified / trusted / gold）
- `GET /api/registry` — 返回所有已注册包（JSON）

**示例：**
```markdown
[![ARK Trust](https://ark-feilunxitong.vercel.app/api/badge?pkg=arkit)](https://ark-feilunxitong.vercel.app)
```

## 技术栈

- **Next.js 14** App Router · Edge Runtime
- **TypeScript** · 零外部数据库（Day 1 mock，Day 2 接真实数据）
- **Tailwind CSS** · 极简深色 UI
- **Vercel** · 部署平台（全球边缘节点，毫秒级响应）

## 本地开发

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 部署

1. Push 到 GitHub
2. 在 Vercel 导入此仓库
3. 等待 1-2 分钟构建完成
4. 自动获得 `ark-badge-service.vercel.app` 域名

## 路线图

- [ ] **Day 2**：接入真实 PyPI/npm 包数据
- [ ] **Day 3**：GitHub OAuth 提交注册申请
- [ ] **Day 5**：自动跑测试 + 安全扫描
- [ ] **Day 7**：开放公测，收集前 100 个包
- [ ] **Day 15**：发布 v1.0 + 收费计划

## License

MIT · 2026 ARK Team

# 🛡 ARK Badge Service

**让 AI 时代的代码自带信任徽章。**
ARK Trust Badge — 嵌入 README，一眼看见：谁写的？跑没跑过？安全吗？

> Day 1 · 2026-06-12 · 15-Day Sprint · 因果模型驱动 · 一次验证 · 全网信任

---

## 🌐 在线地址（主服务）

| 路径 | 用途 | 示例 |
|------|------|------|
| `/` | 首页（注册中心总览） | https://ark-badge-service.vercel.app |
| `/api/badge` | 生成 Trust Badge SVG | `?pkg=arkit&style=flat` |
| `/api/health` | 服务健康检查 | https://ark-badge-service.vercel.app/api/health |
| `/api/registry` | 注册包列表（JSON） | https://ark-badge-service.vercel.app/api/registry |
| `/api/build-info` | 部署构建信息 | https://ark-badge-service.vercel.app/api/build-info |

---

## 📋 已注册包（截至 2026-06-12）

| 包名 | 生态 | 状态 | 分数 | 作者 |
|------|------|------|------|------|
| arkit | npm | ★ Gold | 98 | feilunxitong |
| ark-trust | pypi | ★ Gold | 98 | feilunxitong |
| react | npm | 🛡 Trusted | 95 | Meta |
| next | npm | 🛡 Trusted | 95 | Vercel |
| langchain | pypi | ✓ Verified | 82 | LangChain Inc. |
| requests | pypi | ✓ Verified | 88 | Kenneth Reitz |

---

## 🚀 使用方法

### 1. Markdown（嵌入 README）

```markdown
[![ARK Trust](https://ark-badge-service.vercel.app/api/badge?pkg=arkit)](https://ark-badge-service.vercel.app)
```

### 2. HTML（嵌入网页）

```html
<a href="https://ark-badge-service.vercel.app">
  <img src="https://ark-badge-service.vercel.app/api/badge?pkg=arkit&style=plastic" alt="ARK Trust" />
</a>
```

### 3. SDK 调用（程序化生成）

```typescript
import { arkit } from '@feilunxitong/arkit';

const badgeUrl = arkit.badgeUrl({ pkg: 'arkit', style: 'plastic' });
const markdown = arkit.markdownBadge('arkit');
```

```python
from ark_trust import ArkTrust
ark = ArkTrust()
url = ark.badge_url(pkg='arkit', style='plastic')
md = ark.markdown_badge('arkit')
```

---

## 🔍 端到端测试

### 一键自检脚本

```bash
cd ark-badge-service
./scripts/verify.sh
```

### 手动验证

```bash
# 1. 首页（应看到"给 AI 时代的代码"标题）
curl -i https://ark-badge-service.vercel.app/

# 2. 健康检查
curl https://ark-badge-service.vercel.app/api/health

# 3. 注册包列表
curl https://ark-badge-service.vercel.app/api/registry

# 4. arkit 徽章（gold 98）
curl https://ark-badge-service.vercel.app/api/badge?pkg=arkit > arkit.svg
open arkit.svg

# 5. ark-trust 徽章
curl https://ark-badge-service.vercel.app/api/badge?pkg=ark-trust > ark-trust.svg

# 6. 未知包（应返回 unverified 灰色）
curl https://ark-badge-service.vercel.app/api/badge?pkg=does-not-exist
```

---

## 🛠 技术栈

- **Next.js 14.2.5** （App Router）
- **Edge Runtime** （API 路由全部运行在 Vercel Edge，全球 0ms 冷启动）
- **TypeScript** strict mode
- **Tailwind CSS** + 自定义 ARK 设计系统
- **零外部 API 依赖**（Day 1 用 mock 数据，Day 2 接 PyPI/npm 真实 API）

---

## 📁 项目结构

```
ark-badge-service/
├── app/
│   ├── api/
│   │   ├── badge/route.ts          # SVG 徽章生成
│   │   ├── build-info/route.ts     # 部署信息
│   │   ├── health/route.ts         # 健康检查
│   │   └── registry/route.ts       # 注册包列表
│   ├── globals.css                 # ARK 设计系统
│   ├── layout.tsx                  # 根布局
│   └── page.tsx                    # 首页
├── components/
│   ├── BadgePreview.tsx            # 徽章预览组件
│   ├── CodeSnippet.tsx             # 代码片段展示
│   └── RegistryTable.tsx           # 注册表
├── lib/
│   └── registry.ts                 # 注册表数据（mock）
├── scripts/
│   └── verify.sh                   # 端到端自检
├── DEPLOY.md
└── README.md
```

---

## 🔄 CI/CD

- **GitHub** → `wzg0911/ark-badge-service`
- **Vercel** → 自动监听 `main` 分支，每次 push 触发 build
- **当前状态** ✅ 部署成功（commit `792631b`）
- **构建时间** < 1 分钟
- **运行环境** Edge Function（无服务器）

---

## 📞 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| 国内访问超时 | vercel.app 在国外 | 使用 IPFS 镜像 `https://cf769ef1.pinit.eth.limo` 或 VPN |
| 徽章显示 unverified | 包未注册 | 提交包名到 lib/registry.ts |
| 404 on /api/health | 路由文件缺失 | 已修复（commit 3a03ef6） |

---

## 📜 License

© 2026 ARK · 让众生物质丰盈、精神富足、灵魂觉醒

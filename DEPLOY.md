# 🚀 部署记录

## Day 1 · 2026-06-12

### ✅ 已完成里程碑

| 时间 | 事件 | 状态 |
|------|------|------|
| 22:06 | GitHub OAuth + Vercel 注册 | ✅ |
| 22:23 | 仓库 `ark-badge-service` 创建 | ✅ |
| 22:30 | 代码推送 commit `040eff4` | ✅ |
| 22:32-23:26 | Vercel GitHub App 授权 | ✅ |
| 23:35 | 首次部署成功，URL `ark-badge-service.vercel.app` | ✅ |
| 23:48 | **发现严重 Bug**：首页 CodeSnippet 中域名写错 | ⚠️ |
| 00:01 | **修复**：CodeSnippet 域名修正 + 新增 health/build-info | ✅ |
| 00:02 | **本地端到端 8/8 端点全绿** | ✅ |
| 00:02 | 推送 commit `792631b` → Vercel auto-deploy | ✅ |

### 🐛 发现并修复的 Bug

**Bug #1**: `components/CodeSnippet.tsx` 中硬编码域名错误  
- ❌ `ark-feilunxitong.vercel.app`  
- ✅ `ark-badge-service.vercel.app`（实际部署的 URL）

**影响**: 用户在浏览器访问首页时，所有 demo badge 加载失败，导致页面看起来"无法访问"。  
**修复**: 改为 `BASE` 常量，所有引用统一。

**Bug #2**: `/api/health` 路由文件缺失  
- **影响**: README 中承诺的健康检查端点 404  
- **修复**: 新增 `app/api/health/route.ts`

**Bug #3**: `/api/build-info` 调用了 edge runtime 不存在的 `process.uptime`  
- **影响**: 500 错误  
- **修复**: 移除 uptime 字段

### 📊 端到端验证结果

```
[1] 首页              HTTP:200 | Size:20854 bytes
[2] /api/health       HTTP:200 | status:ok | packages:6
[3] /api/registry     HTTP:200 | total:6 packages
[4] /api/badge?pkg=arkit        HTTP:200 | SVG 1070 bytes | gold·98
[5] /api/badge?pkg=ark-trust    HTTP:200 | SVG 1077 bytes | gold·98
[6] /api/badge?pkg=react        HTTP:200 | SVG 1093 bytes | trusted·95
[7] /api/badge?pkg=unknown      HTTP:200 | SVG 1103 bytes | unverified
[8] /api/build-info   HTTP:200 | runtime:edge
```

**结论**: 8/8 端点全部通过 ✅ Day 0 100% 收官

### ⚠️ 已知限制

- **国内访问 vercel.app 超时** — 需 IPFS 镜像或国内 CDN（明早主人决策）
- **PyPI/npm 真实 API 未接入** — Day 2 任务
- **注册中心只读** — Day 2 加入用户提交包名的 API

### 📅 Day 2 计划（待主人确认）

1. 解决国内访问问题（IPFS 镜像 / 国内 CDN）
2. 把 Badge URL 嵌入 ark-trust 和 arkit 的 PyPI/npm README
3. 接入 PyPI API（`https://pypi.org/pypi/{pkg}/json`）
4. 接入 npm Registry API（`https://registry.npmjs.org/{pkg}`）
5. 加入 POST /api/register（用户提交包名）

---

**Updated**: 2026-06-12 00:03 GMT+8  
**Status**: 🟢 全部服务上线

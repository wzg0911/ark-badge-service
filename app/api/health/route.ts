/**
 * Health Check & Build Info
 * GET /api/health
 *
 * 用于：
 * 1. 部署后自检（Vercel Function 是否在线）
 * 2. README / Dashboard 显示当前服务状态
 * 3. 显示当前 build 时间和 git commit，便于快速核对版本
 */
import { listAllPackages } from '@/lib/registry';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const packages = listAllPackages();
  return Response.json({
    status: 'ok',
    service: 'ark-badge-service',
    version: '0.1.0',
    buildTime: new Date().toISOString(),
    packages: packages.length,
    endpoints: {
      home: '/',
      badge: '/api/badge?pkg=<name>&type=<pypi|npm>&style=<flat|plastic>',
      health: '/api/health',
      registry: '/api/registry',
      buildInfo: '/api/build-info',
    },
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

/**
 * Build Info - 显示部署信息
 * GET /api/build-info
 */
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    service: 'ark-badge-service',
    version: '0.1.0',
    runtime: 'edge',
    buildTime: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime?.() ?? 0),
    nodeVersion: process.version,
    region: process.env.VERCEL_REGION || 'unknown',
  }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

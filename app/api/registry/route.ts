/**
 * Registry API - 列出所有已注册包
 * GET /api/registry
 */
import { listAllPackages } from '@/lib/registry';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const packages = listAllPackages();
  return Response.json({
    total: packages.length,
    updatedAt: new Date().toISOString(),
    packages,
  }, {
    headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' },
  });
}

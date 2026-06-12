/**
 * ARK Trust Badge SVG Engine
 * GET /api/badge?pkg=<name>&type=<type>&style=<flat|plastic>
 *
 * 核心思想：
 * - 用户传包名 → 服务端查注册表 → 渲染对应状态徽章
 * - 状态：unverified / verified / trusted / gold
 * - 全程 Edge Function，无后端依赖
 */

import { NextRequest } from 'next/server';
import { lookupPackage } from '@/lib/registry';

// 强制 Edge Runtime（更便宜、更快）
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const COLORS = {
  unverified: { bg: '#6b7280', label: '#ffffff' },  // 灰
  verified:   { bg: '#00d9ff', label: '#0a0a0f' },  // 青
  trusted:    { bg: '#10b981', label: '#ffffff' },  // 绿
  gold:       { bg: '#fbbf24', label: '#0a0a0f' },  // 金
};

const ICONS: Record<string, string> = {
  verified: '✓',
  trusted:  '🛡',
  gold:     '★',
  unverified: '○',
};

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildBadge(pkg: string, status: string, score: number, style: 'flat' | 'plastic' = 'flat') {
  const c = COLORS[status as keyof typeof COLORS] || COLORS.unverified;
  const icon = ICONS[status] || ICONS.unverified;
  const labelText = 'ARK Trust';
  const valueText = status === 'unverified'
    ? 'unverified'
    : `${status} · ${score}`;

  // 估算文字宽度（粗略）
  const labelW = 92;
  const valueW = Math.max(96, valueText.length * 7.5 + 28);
  const totalW = labelW + valueW;
  const radius = style === 'plastic' ? 4 : 0;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="28" viewBox="0 0 ${totalW} 28" role="img" aria-label="ARK Trust: ${valueText}">
  <title>${escapeXml(pkg)} — ${escapeXml(valueText)}</title>
  <defs>
    <linearGradient id="g-${status}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${c.bg}" stop-opacity="${style === 'plastic' ? '0.85' : '1'}"/>
    </linearGradient>
  </defs>
  <clipPath id="r-${status}"><rect width="${totalW}" height="28" rx="${radius}" ry="${radius}"/></clipPath>
  <g clip-path="url(#r-${status})">
    <rect width="${labelW}" height="28" fill="#1f1f2e"/>
    <rect x="${labelW}" width="${valueW}" height="28" fill="url(#g-${status})"/>
    <text x="${labelW / 2}" y="19" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" font-weight="600" fill="#e5e7eb">${icon} ${escapeXml(labelText)}</text>
    <text x="${labelW + valueW / 2}" y="19" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" font-weight="700" fill="${c.label}">${escapeXml(valueText)}</text>
  </g>
</svg>`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pkg = (searchParams.get('pkg') || '').trim();
  const style = (searchParams.get('style') === 'plastic' ? 'plastic' : 'flat') as 'flat' | 'plastic';

  if (!pkg) {
    return new Response(buildBadge('unknown', 'unverified', 0, style), {
      headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const record = lookupPackage(pkg);
  const status = record?.status || 'unverified';
  const score = record?.score || 0;

  return new Response(buildBadge(pkg, status, score, style), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'X-ARK-Status': status,
      'X-ARK-Score': String(score),
    },
  });
}

'use client';

import type { PackageRecord } from '@/lib/registry';

const STATUS_LABEL = {
  gold:       { text: '★ Gold',     cls: 'text-ark-gold bg-ark-gold/10' },
  trusted:    { text: '🛡 Trusted', cls: 'text-emerald-400 bg-emerald-400/10' },
  verified:   { text: '✓ Verified', cls: 'text-ark-cyan bg-ark-cyan/10' },
  unverified: { text: '○ Pending',  cls: 'text-ark-muted bg-ark-muted/10' },
};

const STATUS_ORDER: Record<string, number> = { gold: 0, trusted: 1, verified: 2, unverified: 3 };

export default function RegistryTable({ packages }: { packages: PackageRecord[] }) {
  const sorted = [...packages].sort((a, b) => {
    const so = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
    if (so !== 0) return so;
    return b.score - a.score;
  });

  return (
    <div className="border border-ark-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-ark-card">
          <tr className="text-left text-ark-muted">
            <th className="px-4 py-3">包名</th>
            <th className="px-4 py-3">生态</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3 text-right">分数</th>
            <th className="px-4 py-3 text-right">下载量</th>
            <th className="px-4 py-3">作者</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => {
            const s = STATUS_LABEL[p.status];
            return (
              <tr key={`${p.ecosystem}:${p.name}`} className="border-t border-ark-border hover:bg-ark-card/50">
                <td className="px-4 py-3">
                  <div className="font-mono text-ark-text">{p.name}</div>
                  {p.description && <div className="text-xs text-ark-muted mt-0.5">{p.description}</div>}
                </td>
                <td className="px-4 py-3 text-ark-muted">{p.ecosystem}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono ${s.cls}`}>
                    {s.text}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono">{p.score}</td>
                <td className="px-4 py-3 text-right text-ark-muted font-mono">
                  {p.downloads ? p.downloads.toLocaleString() : '—'}
                </td>
                <td className="px-4 py-3 text-ark-muted">{p.author || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

'use client';

import { useState } from 'react';

const BASE = 'https://ark-badge-service.vercel.app';

const TABS = [
  {
    name: 'Markdown',
    code: `[![ARK Trust](${BASE}/api/badge?pkg=arkit)](${BASE})`,
    desc: '嵌入 README / 文档',
  },
  {
    name: 'HTML',
    code: `<a href="${BASE}">
  <img src="${BASE}/api/badge?pkg=arkit&style=plastic" alt="ARK Trust" />
</a>`,
    desc: '嵌入网页 / 落地页',
  },
  {
    name: 'TypeScript',
    code: `import { arkit } from '@feilunxitong/arkit';

const badgeUrl = arkit.badgeUrl({ pkg: 'arkit', style: 'plastic' });
const markdown = arkit.markdownBadge('arkit');
console.log(markdown);`,
    desc: 'SDK 调用，程序化生成',
  },
];

export default function CodeSnippet() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(TABS[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-ark-border rounded-lg overflow-hidden bg-ark-card/50">
      <div className="flex border-b border-ark-border">
        {TABS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-mono transition ${
              i === active
                ? 'bg-ark-bg text-ark-cyan border-b-2 border-ark-cyan'
                : 'text-ark-muted hover:text-ark-text'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="p-6">
        <div className="text-xs text-ark-muted mb-2">{TABS[active].desc}</div>
        <pre className="bg-ark-bg border border-ark-border rounded p-4 overflow-x-auto text-sm font-mono">
          <code>{TABS[active].code}</code>
        </pre>
        <button
          onClick={onCopy}
          className="mt-4 px-4 py-1.5 text-xs font-mono border border-ark-border rounded hover:border-ark-cyan hover:text-ark-cyan transition"
        >
          {copied ? '✓ 已复制' : '复制代码'}
        </button>
      </div>
    </div>
  );
}

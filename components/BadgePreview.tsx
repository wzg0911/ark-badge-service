'use client';

import { useEffect, useState } from 'react';

interface Props {
  pkg: string;
  status: 'unverified' | 'verified' | 'trusted' | 'gold';
  score: number;
}

export default function BadgePreview({ pkg, status, score }: Props) {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    fetch(`/api/badge?pkg=${pkg}`)
      .then(r => r.text())
      .then(setSvg)
      .catch(() => setSvg(''));
  }, [pkg]);

  if (!svg) {
    return (
      <div className="h-7 w-40 bg-ark-card border border-ark-border rounded animate-pulse" />
    );
  }

  return (
    <div
      className="h-7"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

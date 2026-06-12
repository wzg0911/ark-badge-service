import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ARK · Trust Badge for AI-Powered Code',
  description: '给 AI 生成的代码加一个信任徽章。Verify once, trust everywhere.',
  openGraph: {
    title: 'ARK · Trust Badge for AI-Powered Code',
    description: 'Verify once, trust everywhere. 因果模型驱动的开源信任协议。',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

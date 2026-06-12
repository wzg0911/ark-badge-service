/**
 * ARK Registry - 模拟的包注册表
 * 实际生产会接 PyPI/npm API + 我们的审核数据
 * Day 1 用硬编码 mock，Day 2 接真实数据
 */

export type TrustStatus = 'unverified' | 'verified' | 'trusted' | 'gold';

export interface PackageRecord {
  name: string;
  ecosystem: 'pypi' | 'npm' | 'cargo' | 'go';
  status: TrustStatus;
  score: number;       // 0-100
  author?: string;
  verifiedAt?: string;
  downloads?: number;
  githubStars?: number;
  description?: string;
}

// 种子数据 - 包含我们自己刚发布的 SDK + 几个标杆
export const SEED_REGISTRY: Record<string, PackageRecord> = {
  // 我们自己（黄金级别 - 创始团队）
  'arkit': {
    name: 'arkit',
    ecosystem: 'npm',
    status: 'gold',
    score: 98,
    author: 'feilunxitong',
    verifiedAt: '2026-06-12',
    downloads: 0,
    githubStars: 0,
    description: 'ARK TypeScript SDK - 因果模型与信任协议',
  },
  'ark-trust': {
    name: 'ark-trust',
    ecosystem: 'pypi',
    status: 'gold',
    score: 98,
    author: 'feilunxitong',
    verifiedAt: '2026-06-12',
    downloads: 0,
    githubStars: 0,
    description: 'ARK Python SDK - 因果模型与信任协议',
  },
  // 标杆示例（演示用）
  'react': {
    name: 'react',
    ecosystem: 'npm',
    status: 'trusted',
    score: 95,
    author: 'Meta',
    downloads: 500000000,
    githubStars: 230000,
  },
  'next': {
    name: 'next',
    ecosystem: 'npm',
    status: 'trusted',
    score: 95,
    author: 'Vercel',
    downloads: 8000000,
    githubStars: 124000,
  },
  'langchain': {
    name: 'langchain',
    ecosystem: 'pypi',
    status: 'verified',
    score: 82,
    author: 'LangChain Inc.',
    downloads: 25000000,
    githubStars: 92000,
  },
  'requests': {
    name: 'requests',
    ecosystem: 'pypi',
    status: 'verified',
    score: 88,
    author: 'Kenneth Reitz',
    downloads: 500000000,
    githubStars: 52000,
  },
};

export function lookupPackage(pkg: string): PackageRecord | null {
  return SEED_REGISTRY[pkg.toLowerCase()] || null;
}

export function listAllPackages(): PackageRecord[] {
  return Object.values(SEED_REGISTRY);
}

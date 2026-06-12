import { listAllPackages } from '@/lib/registry';
import BadgePreview from '@/components/BadgePreview';
import RegistryTable from '@/components/RegistryTable';
import CodeSnippet from '@/components/CodeSnippet';

export default function Home() {
  const packages = listAllPackages();
  const totalScore = packages.reduce((s, p) => s + p.score, 0);
  const avgScore = Math.round(totalScore / packages.length);
  const goldCount = packages.filter(p => p.status === 'gold').length;
  const trustedCount = packages.filter(p => p.status === 'trusted').length;

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="px-6 py-20 md:py-32 max-w-6xl mx-auto text-center fade-up">
        <div className="inline-block mb-6 px-3 py-1 border border-ark-border rounded-full text-xs font-mono text-ark-cyan">
          ● Day 1 · 2026-06-12 · 15-Day Sprint
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          给 <span className="text-ark-cyan">AI 时代</span> 的代码
          <br />
          一个<span className="text-ark-gold">信任徽章</span>
        </h1>
        <p className="text-lg md:text-xl text-ark-muted max-w-2xl mx-auto mb-10">
          ARK Trust Badge — 嵌入 README，一眼看见：谁写的？跑没跑过？安全吗？
          <br />
          因果模型驱动 · 一次验证 · 全网信任
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <BadgePreview pkg="arkit" status="gold" score={98} />
          <BadgePreview pkg="ark-trust" status="gold" score={98} />
          <BadgePreview pkg="next" status="trusted" score={95} />
          <BadgePreview pkg="requests" status="verified" score={88} />
          <BadgePreview pkg="unknown-pkg" status="unverified" score={0} />
        </div>
        <a
          href="https://github.com/wzg0911/ark-ts"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ark-cyan text-ark-bg font-semibold rounded hover:opacity-90 transition"
        >
          开始使用 →
        </a>
      </section>

      {/* STATS */}
      <section className="border-y border-ark-border bg-ark-card/50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-ark-cyan">{packages.length}</div>
            <div className="text-sm text-ark-muted mt-1">已注册包</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-ark-gold">{goldCount}</div>
            <div className="text-sm text-ark-muted mt-1">黄金级</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">{trustedCount}</div>
            <div className="text-sm text-ark-muted mt-1">受信级</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{avgScore}</div>
            <div className="text-sm text-ark-muted mt-1">平均信任分</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">三步接入</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: '注册包', desc: '提交包名与仓库地址，我们开始评估。' },
            { step: '02', title: '获得徽章', desc: '审核通过后，生成专属 Trust Badge URL。' },
            { step: '03', title: '嵌入 README', desc: '复制 Markdown 代码到 README，README 自动展示信任状态。' },
          ].map((s) => (
            <div key={s.step} className="p-6 border border-ark-border rounded-lg bg-ark-card/50 hover:border-ark-cyan transition">
              <div className="text-ark-cyan font-mono text-sm mb-2">{s.step}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-ark-muted text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CODE */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">一行代码嵌入</h2>
        <CodeSnippet />
      </section>

      {/* REGISTRY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">注册中心</h2>
        <p className="text-center text-ark-muted mb-8">
          实时 · 公开 · 可审计的信任状态
        </p>
        <RegistryTable packages={packages} />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ark-border py-8 text-center text-ark-muted text-sm">
        <p>© 2026 ARK · 让众生物质丰盈、精神富足、灵魂觉醒</p>
        <p className="mt-2 font-mono text-xs">
          <a href="/api/registry" className="hover:text-ark-cyan">API</a>
          {' · '}
          <a href="/api/badge?pkg=arkit" className="hover:text-ark-cyan">Badge Demo</a>
          {' · '}
          <a href="https://github.com/wzg0911" className="hover:text-ark-cyan">GitHub</a>
        </p>
      </footer>
    </main>
  );
}

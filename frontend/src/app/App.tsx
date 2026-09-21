import { PublicLayout } from '../components/layout/PublicLayout'

function App() {
  return (
    <PublicLayout>
      <main className="relative isolate overflow-hidden">
        <div className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-moss-100 blur-3xl" />
        <section className="mx-auto grid min-h-[calc(100vh-13rem)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-28">
          <div>
            <p className="mb-6 text-xs font-bold tracking-[0.24em] text-moss-700">PERSONAL PLATFORM / 2026</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.06em] text-slate-900 sm:text-7xl lg:text-8xl">
              つくる、試す、<span className="text-moss-600">積み重ねる。</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              日常の活動を管理しながら、制作物と開発の経験を積み重ねていく場所。
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a className="rounded-full bg-moss-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-moss-600/15 transition hover:bg-moss-700" href="/projects">制作物を見る</a>
              <a className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-moss-600 hover:text-moss-700" href="/about">About YUKU LAB</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-slate-400">NOW BUILDING</p>
            <div className="mt-8 border-l-2 border-moss-600 pl-5">
              <p className="text-2xl font-semibold tracking-tight text-slate-900">YUKU LAB</p>
              <p className="mt-2 text-sm leading-7 text-slate-500">Portfolio と Workspace をひとつにする個人向けプラットフォーム。</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 text-sm">
              <div><p className="text-slate-400">Focus</p><p className="mt-1 font-medium">Web / Product</p></div>
              <div><p className="text-slate-400">Status</p><p className="mt-1 font-medium text-moss-700">In progress</p></div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}

export default App

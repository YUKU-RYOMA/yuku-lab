import type { ReactNode } from 'react'

const publicLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Journal', href: '/blog' },
]

type PublicLayoutProps = {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f7f3] text-ink">
      <header className="border-b border-black/5 bg-[#f7f7f3]/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="text-sm font-bold tracking-[0.2em] text-moss-700" aria-label="YUKU LAB home">
            YUKU LAB.
          </a>
          <nav aria-label="Public navigation" className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {publicLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-moss-700">
                {link.label}
              </a>
            ))}
            <a href="/app" className="rounded-full bg-moss-600 px-4 py-2 text-white transition-colors hover:bg-moss-700">
              Workspace
            </a>
          </nav>
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-black/10 px-3 py-2 text-sm font-medium">
              Menu
            </summary>
            <nav aria-label="Mobile public navigation" className="absolute right-0 top-12 z-10 grid min-w-44 gap-1 rounded-2xl border border-black/10 bg-white p-2 text-sm shadow-xl">
              {publicLinks.map((link) => (
                <a key={link.href} href={link.href} className="rounded-xl px-3 py-2 hover:bg-moss-50">
                  {link.label}
                </a>
              ))}
              <a href="/app" className="rounded-xl px-3 py-2 font-medium text-moss-700 hover:bg-moss-50">
                Workspace →
              </a>
            </nav>
          </details>
        </div>
      </header>

      <div>{children}</div>

      <footer className="border-t border-black/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>YUKU LAB. — つくる、試す、積み重ねる。</span>
          <span>© {new Date().getFullYear()} YUKU LAB.</span>
        </div>
      </footer>
    </div>
  )
}

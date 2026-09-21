import type { ReactNode } from 'react'

const workspaceLinks = [
  { label: 'Overview', href: '/app', icon: '⌂' },
  { label: 'Tasks', href: '/app/tasks', icon: '✓' },
  { label: 'Projects', href: '/app/projects', icon: '◆' },
  { label: 'GitHub', href: '/app/github', icon: '◌' },
  { label: 'Apps', href: '/app/apps', icon: '⊞' },
]

type WorkspaceLayoutProps = {
  children: ReactNode
}

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <a href="/" className="block px-3 text-sm font-bold tracking-[0.2em] text-moss-700">YUKU LAB.</a>
        <p className="mb-8 mt-2 px-3 text-xs text-slate-400">Workspace</p>
        <nav aria-label="Workspace navigation" className="grid gap-1">
          {workspaceLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${index === 0 ? 'bg-moss-50 text-moss-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <span aria-hidden="true" className="w-4 text-center text-base">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/" className="absolute bottom-6 left-8 text-sm text-slate-400 hover:text-moss-700">← Public site</a>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-sm font-bold tracking-[0.2em] text-moss-700">YUKU LAB.</span>
            <span className="text-sm text-slate-400">/</span>
            <span className="text-sm font-medium">Workspace</span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-sm text-slate-500">
            <span className="hidden sm:inline">Welcome back</span>
            <div className="grid size-8 place-items-center rounded-full bg-moss-100 font-semibold text-moss-700" aria-label="Account">Y</div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  )
}

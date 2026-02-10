
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function Layout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 px-4 py-4 md:px-8 md:py-6 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          <div className="mx-auto max-w-6xl space-y-4">{children}</div>
        </main>
      </div>
    </div>
  );
}


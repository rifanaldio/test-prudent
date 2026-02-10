
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';

export default function HomePage() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="space-y-4">
      <section className="card relative overflow-hidden px-6 py-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-500">
              Welcome
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
              {user ? (
                <>
                  Selamat datang,&nbsp;
                  <span className="text-primary-300">
                    {user.firstName} {user.lastName}
                  </span>
                </>
              ) : (
                'Selamat datang di Mini Inventory'
              )}
            </h2>
          </div>
          <div className="flex gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex flex-col items-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
              <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
                Teknologi
              </span>
              <span>React 18 + Vite</span>
              <span>Redux Toolkit</span>
              <span>Tailwind CSS</span>
            </div>
            <div className="hidden flex-col items-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:flex dark:border-slate-800 dark:bg-slate-900/70">
              <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
                UX
              </span>
              <span>Skeleton Loading</span>
              <span>Responsive Layout</span>
              <span>Clean Icons</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


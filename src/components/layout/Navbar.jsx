
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { selectTheme, toggleTheme } from '../../store/slices/uiSlice';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export function Navbar() {
  const user = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const isDark = theme === 'dark';

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/70 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-400">
          Dashboard
        </p>
        <h2 className="text-sm font-semibold text-slate-50">
          {user ? (
            <>
              Selamat datang,&nbsp;
              <span className="text-primary-300">
                {user.firstName} {user.lastName}
              </span>
            </>
          ) : (
            'Welcome'
          )}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white shadow shadow-primary-900/60">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
            <div className="hidden text-xs leading-tight sm:block">
              <p className="font-medium text-black dark:text-slate-100">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[11px] text-slate-500">{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


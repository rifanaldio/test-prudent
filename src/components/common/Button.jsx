

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    variant === 'primary'
      ? 'inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow shadow-primary-700/40 transition hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950'
      : 'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:border-slate-500';

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}


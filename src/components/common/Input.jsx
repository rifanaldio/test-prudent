

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <input className={`input ${className}`} {...props} />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotification, clearNotification } from '../../store/slices/uiSlice';
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex max-w-sm flex-col gap-2">
      <div
        className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-3 py-2 text-sm shadow-lg ${
          isSuccess
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-700/70 dark:bg-emerald-950/50 dark:text-emerald-100'
            : 'border-red-200 bg-red-50 text-red-800 dark:border-red-700/70 dark:bg-red-950/50 dark:text-red-100'
        }`}
      >
        <div className="mt-0.5">
          {isSuccess ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <ExclamationCircleIcon className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide">
            {isSuccess ? 'Berhasil' : 'Gagal'}
          </p>
          <p className="mt-0.5 text-xs">{notification.message}</p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearNotification())}
          className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs text-slate-500 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800/60"
        >
          <XMarkIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}


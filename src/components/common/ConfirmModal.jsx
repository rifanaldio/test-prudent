
import { Button } from './Button';

export function ConfirmModal({ open, title, description, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed -inset-20 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="card w-full max-w-sm p-5">
        <h2 className="mb-2 text-lg font-semibold text-black dark:text-slate-50">{title}</h2>
        <p className="mb-4 text-sm text-slate-400">{description}</p>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            className="border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            type="button"
            className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Menghapus...' : 'Ya, hapus'}
          </Button>
        </div>
      </div>
    </div>
  );
}


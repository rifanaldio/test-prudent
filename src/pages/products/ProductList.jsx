import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectProducts,
  selectProductsError,
  selectProductsSearch,
  selectProductsStatus,
  setSearch,
  fetchProducts,
  deleteProduct
} from '../../store/slices/productsSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { SearchInput } from '../../components/common/SearchInput';
import { Button } from '../../components/common/Button';
import { Skeleton } from '../../components/common/Skeleton';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export default function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const search = useSelector(selectProductsSearch);

  const [localSearch, setLocalSearch] = useState(search);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ search }));
  }, [dispatch, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearch(localSearch));
    }, 400);
    return () => clearTimeout(timeout);
  }, [localSearch, dispatch]);

  const isLoading = status === 'loading';

  const skeletons = useMemo(
    () => Array.from({ length: 8 }, (_, i) => i),
    []
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      dispatch(
        showNotification({
          type: 'success',
          message: 'Berhasil menghapus product.'
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          type: 'error',
          message:
            typeof err === 'string'
              ? err
              : 'Terjadi kesalahan saat menghapus product.'
        })
      );
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Products</h2>
          <p className="text-xs text-slate-600 dark:text-slate-500">
            List product dari DummyJSON dengan fitur search, detail, add, edit, dan delete.
          </p>
        </div>
        <Button onClick={() => navigate('/products/add')}>
          <PlusIcon className="h-4 w-4" />
          <span>Tambah Product</span>
        </Button>
      </div>

      <div className="card flex items-center justify-between gap-3 px-4 py-3">
        <SearchInput
          value={localSearch}
          onChange={setLocalSearch}
          placeholder="Cari produk (nama / brand / kategori)..."
          className="w-full md:max-w-xs "
        />
        <p className="hidden text-xs text-black dark:text-slate-500 md:block">
          Total:&nbsp;
          <span className="font-semibold text-black dark:text-slate-200">
            {isLoading ? '...' : products.length}
          </span>
          &nbsp;produk
        </p>
      </div>

      {error && status === 'failed' && (
        <div className="rounded-lg border border-red-700/70 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {isLoading &&
          skeletons.map((i) => (
            <div key={i} className="card space-y-3 p-3">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-7 w-20" />
              </div>
            </div>
          ))}

        {!isLoading &&
          products.map((product) => (
            <div
              key={product.id}
              className="card flex flex-col justify-between p-3 transition hover:-translate-y-0.5 hover:border-primary-500/60 hover:shadow-primary-900/40"
            >
              <Link to={`/products/${product.id}`} className="flex gap-3">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border dark:border-slate-800 dark:bg-slate-900/70">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="truncate text-sm font-semibold text-black dark:text-slate-50">
                    {product.title}
                  </h3>
                  <p className="truncate text-xs text-slate-400">
                    {product.brand} • {product.category}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary-300">
                    ${product.price}
                  </p>
                </div>
              </Link>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <div className="flex gap-1.5 text-[11px] text-slate-400">
                  <span className="rounded-full dark:bg-slate-900/70 px-2 py-0.5">
                    Stock: <span className="font-semibold">{product.stock}</span>
                  </span>
                  <span className="rounded-full dark:bg-slate-900/70 px-2 py-0.5 flex flex-row items-center">
                    Rating: <StarIcon color='yellow' className="h-3.5 w-3.5 inline text-yellow-400" /> <span className="font-semibold">{product.rating}</span>
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-green-700 dark:bg-slate-900/70 px-2 py-1 text-[11px] text-slate-200 hover:bg-green-800 dark:hover:bg-slate-800"
                  >
                    <PencilSquareIcon className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(product.id)}
                    className="inline-flex items-center justify-center rounded-lg border border-red-700/70 dark:bg-red-950/50 px-2 py-1 text-[11px] text-red-200 hover:bg-slate-300 dark:hover:bg-red-900/80"
                  >
                    <TrashIcon className="h-3.5 w-3.5 text-red-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Hapus produk?"
        description="Aksi ini akan menghapus produk dari daftar (mock API DummyJSON)."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  clearSelectedProduct,
  fetchProductById,
  selectDetailStatus,
  selectSelectedProduct
} from '../../store/slices/productsSlice';
import { Skeleton } from '../../components/common/Skeleton';
import { ArchiveBoxIcon, ArrowLeftIcon, CurrencyDollarIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';


export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectDetailStatus);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const loading = status === 'loading' || !product;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Detail Product</h2>
          <p className="text-xs text-slate-600 dark:text-slate-500">
            Informasi lengkap mengenai produk yang dipilih.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Kembali
          </Link>
          {product && (
            <Link
              to={`/products/${product.id}/edit`}
              className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-700"
            >
              <PencilSquareIcon className="h-3.5 w-3.5" />
              Edit
            </Link>
          )}
        </div>
      </div>

      <div className="card grid gap-5 p-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-6">
        <div>
          {loading ? (
            <Skeleton className="h-56 w-full rounded-xl" />
          ) : (
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-56 w-full object-cover"
              />
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {['price', 'stock', 'rating'].map((key) => (
              <div
                key={key}
                className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60"
              >
                {loading ? (
                  <>
                    <Skeleton className="mb-1 h-2 w-12" />
                    <Skeleton className="h-4 w-10" />
                  </>
                ) : (
                  <>
                    <span className="text-[11px] uppercase tracking-wide text-slate-500 flex flex-row items-center space-x-5">
                      <p>
                        {key === 'price'
                          ? 'Price'
                          : key === 'stock'
                            ? 'Stock'
                            : 'Rating'}
                      </p>
                      <p>
                        {key === 'price'
                          ? <CurrencyDollarIcon className="h-5 w-5 inline text-green-400" />
                          : key === 'stock'
                            ? <ArchiveBoxIcon className="h-5 w-5 inline text-teal-400" />
                            : <StarIcon className="h-5 w-5 inline text-yellow-400" />}
                      </p>
                    </span>
                    <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {key === 'price'
                        ? `$${product.price}`
                        : key === 'stock'
                          ? product.stock
                          : product.rating}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          {loading ? (
            <>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-20 w-full" />
            </>
          ) : (
            <>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {product.brand} • {product.category}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700 dark:bg-green-900/40 dark:text-green-300">
                  Diskon: {product.discountPercentage}% off
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Deskripsi
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {product.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


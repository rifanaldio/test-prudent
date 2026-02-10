import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  addProduct,
  fetchProductById,
  selectDetailStatus,
  selectSelectedProduct,
  updateProduct,
  clearSelectedProduct
} from '../../store/slices/productsSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Skeleton } from '../../components/common/Skeleton';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const baseForm = {
  title: '',
  description: '',
  price: '',
  brand: '',
  category: '',
  stock: '',
  discountPercentage: ''
};

export default function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectSelectedProduct);
  const detailStatus = useSelector(selectDetailStatus);

  const [form, setForm] = useState(baseForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchProductById(id));
    } else {
      dispatch(clearSelectedProduct());
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && product) {
      setForm({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        brand: product.brand || '',
        category: product.category || '',
        stock: product.stock?.toString() || '',
        discountPercentage: product.discountPercentage?.toString() || ''
      });
    }
  }, [isEdit, product]);

  const loadingInitial = isEdit && detailStatus === 'loading';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price) || 0,
        brand: form.brand,
        category: form.category,
        stock: Number(form.stock) || 0,
        discountPercentage: Number(form.discountPercentage) || 0
      };

      if (isEdit) {
        const result = await dispatch(updateProduct({ id, payload })).unwrap();
        dispatch(
          showNotification({
            type: 'success',
            message: `Berhasil mengupdate product "${result.title || payload.title}".`
          })
        );
      } else {
        const result = await dispatch(addProduct(payload)).unwrap();
        dispatch(
          showNotification({
            type: 'success',
            message: `Berhasil menambah product "${result.title || payload.title}".`
          })
        );
      }

      navigate('/products');
    } catch (err) {
      dispatch(
        showNotification({
          type: 'error',
          message:
            typeof err === 'string'
              ? err
              : 'Terjadi kesalahan saat menyimpan product.'
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {isEdit ? 'Edit Product' : 'Tambah Product'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-500">
            {isEdit
              ? 'Update informasi product yang sudah ada.'
              : 'Tambah product baru ke dalam daftar (mock API DummyJSON).'}
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Kembali
        </Link>
      </div>

      <div className="card p-4 md:p-6">
        {loadingInitial ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input
              label="Nama Product"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Contoh: iPhone 9"
              required
            />
            <Input
              label="Brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Contoh: Apple"
            />
            <Input
              label="Kategori"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Contoh: smartphones"
            />
            <Input
              label="Harga ($)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Contoh: 549"
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Contoh: 94"
            />
            <Input
              label="Diskon (%)"
              name="discountPercentage"
              type="number"
              value={form.discountPercentage}
              onChange={handleChange}
              placeholder="Contoh: 12.96"
            />
            <div className="md:col-span-2">
              <Input
                label="Deskripsi"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat product"
                as="textarea"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                className="px-3 py-1.5 text-xs"
                onClick={() => navigate('/products')}
                disabled={submitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={submitting} className="px-4 py-1.5 text-xs">
                {submitting
                  ? isEdit
                    ? 'Menyimpan...'
                    : 'Menambahkan...'
                  : isEdit
                  ? 'Simpan Perubahan'
                  : 'Tambah Product'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE = 'https://dummyjson.com';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async ({ search = '' } = {}, { rejectWithValue }) => {
    try {
      const endpoint = search
        ? `${API_BASE}/products/search?q=${encodeURIComponent(search)}`
        : `${API_BASE}/products`;

      const res = await fetch(endpoint);
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return rejectWithValue(error?.message || 'Gagal mengambil produk');
      }

      const data = await res.json();
      return data.products || [];
    } catch (err) {
      return rejectWithValue(err.message || 'Terjadi kesalahan jaringan');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return rejectWithValue(error?.message || 'Gagal mengambil detail produk');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Terjadi kesalahan jaringan');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return rejectWithValue(error?.message || 'Gagal menambah produk');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Terjadi kesalahan jaringan');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return rejectWithValue(error?.message || 'Gagal mengupdate produk');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Terjadi kesalahan jaringan');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return rejectWithValue(error?.message || 'Gagal menghapus produk');
      }
      await res.json().catch(() => ({}));
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Terjadi kesalahan jaringan');
    }
  }
);

const initialState = {
  items: [],
  selectedProduct: null,
  status: 'idle', // idle | loading | succeeded | failed
  detailStatus: 'idle',
  error: null,
  search: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.detailStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Gagal mengambil produk';
      })
      // detail
      .addCase(fetchProductById.pending, (state) => {
        state.detailStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.payload || 'Gagal mengambil detail produk';
      })
      // add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      // delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      });
  }
});

export const { setSearch, clearSelectedProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductsSearch = (state) => state.products.search;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectDetailStatus = (state) => state.products.detailStatus;

export default productsSlice.reducer;


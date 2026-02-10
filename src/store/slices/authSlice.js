import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE = 'https://dummyjson.com';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        return rejectWithValue(error?.message || 'Login gagal');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Terjadi kesalahan jaringan');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image
        };
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login gagal';
      });
  }
});

export const { logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;


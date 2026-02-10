import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectAuthError, selectAuthStatus, selectCurrentUser } from '../store/slices/authSlice';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectCurrentUser);

  const [form, setForm] = useState({
    username: 'emilys',
    password: 'emilyspass'
  });

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const loading = status === 'loading';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="card flex w-full max-w-md flex-col overflow-hidden p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow shadow-primary-900/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900 dark:text-slate-50">Mini Inventory</h1>
            <p className="text-xs text-slate-500">Login ke dashboard DummyJSON</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Masukkan username"
            autoComplete="username"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            autoComplete="current-password"
          />

          {error && !loading && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-700/70 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-9 w-full" />
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sedang masuk...' : 'Masuk'}
          </Button>

          <p className="mt-1 text-center text-[11px] text-slate-500">
            Gunakan akun demo DummyJSON:
            <br />
            <span className="font-mono text-slate-300">
              emilys / emilyspass
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}



import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../../store/slices/authSlice';

const navClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-primary-600 text-white shadow shadow-primary-800/50'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
  }`;

export function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white/80 px-4 py-5 dark:border-slate-800 dark:bg-slate-950/70">
      <Link to="/*" className="mb-6 flex items-center gap-3 cursor-pointer">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow shadow-primary-900/60">
          <CubeIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Mini Inventory
          </h1>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        <NavLink to="/" className={navClasses} end>
          <HomeIcon className="h-4 w-4" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/products" className={navClasses}>
          <CubeIcon className="h-4 w-4" />
          <span>Products</span>
        </NavLink>
      </nav>

      {user && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Logged in as
          </p>
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
            {user.firstName} {user.lastName}
          </p>
          <p className="truncate text-[11px] text-slate-500">{user.email}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:text-red-300 dark:hover:bg-red-900/30 dark:hover:text-red-200"
      >
        <ArrowRightOnRectangleIcon className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </aside>
  );
}


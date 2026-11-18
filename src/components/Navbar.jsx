import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/players',   label: 'Find Players' },
  { to: '/games',     label: 'Games' },
  { to: '/teams',     label: 'Teams' },
  { to: '/community', label: 'Community' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate  = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
    setDropOpen(false);
  };

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-white" onClick={() => setMenuOpen(false)}>
          Sport<span className="text-indigo-400">Sphere</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition ${
                isActive(to) ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600/20 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-600/30"
                >
                  <UserIcon className="h-4 w-4" />
                  {user?.name?.split(' ')[0]}
                </button>
                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/10 bg-[#0a0f1e] py-2 shadow-2xl">
                    <Link
                      to="/profile"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      <UserIcon className="h-4 w-4" /> Edit Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-indigo-400 hover:bg-white/5 hover:text-indigo-300"
                      >
                        <Shield className="h-4 w-4" /> Admin Panel
                      </Link>
                    )}
                    <div className="my-1 border-t border-white/10" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white">
                Log in
              </Link>
              <Link to="/register" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="text-white md:hidden"
          onClick={() => { setMenuOpen(!menuOpen); setDropOpen(false); }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#050816] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive(to) ? 'bg-indigo-600/15 text-indigo-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="mt-3 border-t border-white/10 pt-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5">
                    <UserIcon className="h-4 w-4" /> Edit Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-indigo-400 hover:bg-white/5">
                      <Shield className="h-4 w-4" /> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-white/5">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5">
                    Log in
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

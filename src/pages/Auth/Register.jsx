import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin } from 'lucide-react';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const SPORTS = ['Football', 'Cricket', 'Badminton', 'Basketball', 'Volleyball', 'Tennis'];

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', location: '', sports: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSport = (sport) => {
    setForm(prev => ({
      ...prev,
      sports: prev.sports.includes(sport) ? prev.sports.filter(s => s !== sport) : [...prev.sports, sport]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = form;
      const data = await authAPI.register(submitData);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 py-32 text-white">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Join SportSphere</p>
          <h1 className="mt-4 text-4xl font-bold">Create Account</h1>
          <p className="mt-3 text-slate-400">Find players, games and your sports community</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Your location (e.g. Andheri, Mumbai)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password (min 6 chars)" required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">Sports you play (optional)</p>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map(sport => (
                <button key={sport} type="button" onClick={() => toggleSport(sport)}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${form.sports.includes(sport) ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'}`}>
                  {sport}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">Log in</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usersAPI } from '../../services/api';
import { Check } from 'lucide-react';

const SPORTS = ['Football', 'Cricket', 'Badminton', 'Basketball', 'Volleyball', 'Tennis'];

function Profile() {
  const { user, login, token } = useAuth();
  const [form, setForm] = useState({ name: '', location: '', bio: '', sports: [], availability: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || '',
        sports: user.sports || [],
        availability: user.availability || '',
      });
    }
  }, [user]);

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
    setSuccess('');
    setLoading(true);
    try {
      const data = await usersAPI.updateProfile(form);
      login(data.user, token);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Your Account</p>
        <h1 className="mt-4 text-4xl font-bold">Edit Profile</h1>
        <p className="mt-3 text-slate-400">Update your information and sports preferences</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              <Check className="h-4 w-4" /> {success}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Andheri, Mumbai"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Tell other players about yourself..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Availability</label>
            <input type="text" name="availability" value={form.availability} onChange={handleChange} placeholder="e.g. Available weekends"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition" />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">Sports you play</label>
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
            className="w-full rounded-2xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Profile;

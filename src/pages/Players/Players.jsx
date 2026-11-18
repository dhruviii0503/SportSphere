import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Users } from 'lucide-react';
import { usersAPI } from '../../services/api';

const sports = ['All Sports', 'Football', 'Cricket', 'Badminton', 'Basketball', 'Volleyball', 'Tennis'];

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [sport, setSport] = useState('All Sports');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true); setError('');
    usersAPI.getAll({ sport: sport === 'All Sports' ? '' : sport, location })
      .then(data => { if (active) setPlayers(data.users || []); })
      .catch(err => { if (active) { setPlayers([]); setError(err.message || 'Could not load players. Make sure the backend is running.'); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [sport, location]);

  const filtered = useMemo(() => players.filter(p => `${p.name} ${p.location} ${(p.sports || []).join(' ')}`.toLowerCase().includes(query.toLowerCase())), [players, query]);
  return <main className="min-h-screen bg-[#050816] px-6 pb-20 pt-28 text-white">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Find Your People</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Find Players.<span className="block text-indigo-400">Find Your Game.</span></h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Discover people who enjoy the same sports. Search by sport, name or location and connect through SportSphere.</p>
      <div className="mt-9 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-3">
        <select value={sport} onChange={e => setSport(e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white">{sports.map(s => <option key={s}>{s}</option>)}</select>
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (e.g. Andheri)" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
        <div className="relative"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search players or sports" className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-slate-500" /></div>
      </div>
      <div className="mt-10 flex items-center justify-between"><div><h2 className="text-2xl font-bold">Players in the community</h2><p className="mt-2 text-sm text-slate-400">{loading ? 'Loading players…' : `${filtered.length} players found`}</p></div></div>
      {error && <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">{error}</div>}
      {loading ? <div className="py-20 text-center text-slate-400">Loading community members…</div> : filtered.length === 0 ? <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center"><Users className="mx-auto h-9 w-9 text-slate-500"/><h3 className="mt-4 text-xl font-semibold">No players found yet</h3><p className="mt-2 text-slate-400">Create an account and add your sports and location to appear here.</p><Link to="/register" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold">Join SportSphere</Link></div> : <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(player => <article key={player._id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-indigo-500/40"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-lg font-bold text-indigo-300">{(player.name || 'P').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}</div><div><h3 className="font-semibold">{player.name}</h3><p className="mt-1 text-sm text-slate-400">SportSphere player</p></div></div><p className="mt-5 flex items-center gap-2 text-sm text-slate-400"><MapPin className="h-4 w-4 text-indigo-400"/>{player.location || 'Location not added'}</p><div className="mt-4 flex flex-wrap gap-2">{(player.sports || []).map(s => <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{s}</span>)}</div><p className="mt-4 line-clamp-2 text-sm text-slate-400">{player.bio || 'Looking to meet people and play more.'}</p><Link to={`/player/${player._id}`} className="mt-6 block rounded-xl border border-white/10 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-white/5">View Profile</Link></article>)}</div>}
    </div>
  </main>;
}

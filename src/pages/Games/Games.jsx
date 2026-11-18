import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Plus, Search } from 'lucide-react';
import { gamesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const SPORT_ICONS = { Football: '⚽', Cricket: '🏏', Badminton: '🏸', Basketball: '🏀', Volleyball: '🏐', Tennis: '🎾' };

const sports = [
  { name: 'All Games', icon: '🏆' },
  { name: 'Football', icon: '⚽' },
  { name: 'Cricket', icon: '🏏' },
  { name: 'Badminton', icon: '🏸' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Volleyball', icon: '🏐' },
  { name: 'Tennis', icon: '🎾' },
];

function Games() {
  const [selectedSport, setSelectedSport] = useState('All Games');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [joinedGames, setJoinedGames] = useState([]);
  const [joiningId, setJoiningId] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const params = {};
    if (selectedSport !== 'All Games') params.sport = selectedSport;
    if (searchCity) params.city = searchCity;

    setLoading(true); setLoadError('');
    gamesAPI.getAll(params)
      .then(data => setGames(data.games || []))
      .catch(err => { setGames([]); setLoadError(err.message || 'Could not connect to the SportSphere API.'); })
      .finally(() => setLoading(false));
  }, [selectedSport, searchCity]);

  const handleJoinLeave = async (gameId) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setJoiningId(gameId);
    const isJoined = joinedGames.includes(gameId);
    try {
      if (isJoined) {
        await gamesAPI.leave(gameId);
        setJoinedGames(prev => prev.filter(id => id !== gameId));
        setGames(prev => prev.map(g => g._id === gameId ? { ...g, currentPlayers: g.currentPlayers.slice(0, -1) } : g));
      } else {
        await gamesAPI.join(gameId);
        setJoinedGames(prev => [...prev, gameId]);
        setGames(prev => prev.map(g => g._id === gameId ? { ...g, currentPlayers: [...g.currentPlayers, null] } : g));
      }
    } catch (err) {
      alert(err.message || 'Action failed');
    } finally {
      setJoiningId(null);
    }
  };

  const spotsLeft = (game) => game.maxPlayers - (game.currentPlayers?.length || 0);
  const isFull = (game) => spotsLeft(game) <= 0;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Live Discovery</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Find Your Next Game</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Discover games happening around you, meet new players, and get out there to play.</p>
          </div>
          <Link to="/games/create" className="flex w-fit items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-500">
            <Plus className="h-5 w-5" />
            Create a Game
          </Link>
        </div>

        {/* SEARCH */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input type="text" value={searchCity} onChange={e => setSearchCity(e.target.value)}
              placeholder="Search by city (e.g. Mumbai, Powai)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500" />
          </div>
        </div>

        {/* SPORT FILTER */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-3">
            {sports.map(sport => (
              <button key={sport.name} onClick={() => setSelectedSport(sport.name)}
                className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${selectedSport === sport.name ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'}`}>
                <span className="mr-2">{sport.icon}</span>{sport.name}
              </button>
            ))}
          </div>
        </section>

        {/* GAME CARDS */}
        {loadError && <p className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">{loadError} Start the backend and connect MongoDB to load live games.</p>}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          </div>
        ) : games.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-lg">No games found. <Link to="/games/create" className="text-indigo-400 hover:text-indigo-300">Create one!</Link></p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games.map(game => {
              const joined = joinedGames.includes(game._id);
              const full = isFull(game);
              const left = spotsLeft(game);
              return (
                <article key={game._id} className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40">
                  {/* SPORT BADGE */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/15 text-2xl">
                      {SPORT_ICONS[game.sport] || '🏃'}
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${full ? 'border border-red-500/20 bg-red-500/10 text-red-400' : 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}`}>
                      {full ? 'Full' : `${left} spots left`}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-5 text-lg font-semibold">{game.title}</h3>

                  {/* DETAILS */}
                  <div className="mt-4 flex-1 space-y-2.5 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{game.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      <span>{formatDate(game.date)} · {game.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      <span>{game.currentPlayers?.length || 0} / {game.maxPlayers} players</span>
                    </div>
                  </div>

                  {/* HOST */}
                  <p className="mt-4 text-xs text-slate-500">Hosted by {game.host?.name || 'Unknown'}</p>

                  {/* ACTIONS */}
                  <div className="mt-5 flex gap-3 border-t border-white/10 pt-5">
                    <Link to={`/games/${game._id}`}
                      className="flex-1 rounded-xl border border-white/10 py-2.5 text-center text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07]">
                      Details
                    </Link>
                    <button
                      onClick={() => handleJoinLeave(game._id)}
                      disabled={joiningId === game._id || (full && !joined)}
                      className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${joined ? 'border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20' : full ? 'cursor-not-allowed bg-white/10 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                      {joiningId === game._id ? '...' : joined ? 'Leave' : 'Join'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Games;

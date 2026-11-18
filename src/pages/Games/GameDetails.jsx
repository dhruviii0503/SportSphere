
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock,
  Users,
  UserRound,
  CheckCircle2,
  LoaderCircle,
  AlertCircle,
  Trophy,
  ShieldCheck,
} from 'lucide-react';
import { gamesAPI, authAPI } from '../../services/api';

const sportIcons = {
  Football: '⚽',
  Cricket: '🏏',
  Badminton: '🏸',
  Basketball: '🏀',
  Volleyball: '🏐',
  Tennis: '🎾',
};

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadGame = useCallback(async () => {
    try {
      setError('');

      const response = await gamesAPI.getById(id);
      setGame(response.game || response.data?.game || null);

      if (!response.game && !response.data?.game) {
        throw new Error('Game information could not be loaded.');
      }
    } catch (err) {
      setGame(null);
      setError(err.message || 'Unable to load this game.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let active = true;

    async function loadDetails() {
      setLoading(true);
      setError('');

      try {
        const [gameResponse, userResponse] = await Promise.all([
          gamesAPI.getById(id),
          authAPI.getMe().catch(() => null),
        ]);

        if (!active) return;

        const fetchedGame =
          gameResponse.game || gameResponse.data?.game || null;

        if (!fetchedGame) {
          throw new Error('Game information could not be loaded.');
        }

        setGame(fetchedGame);

        const fetchedUser =
          userResponse?.user || userResponse?.data?.user || null;

        setCurrentUser(fetchedUser);
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load this game.');
          setGame(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDetails();

    return () => {
      active = false;
    };
  }, [id]);

  const getId = (value) => {
    if (!value) return '';
    return String(value._id || value.id || value);
  };

  const userId = getId(currentUser?._id || currentUser?.id);
  const hostId = getId(game?.host);
  const isHost = Boolean(userId && hostId && userId === hostId);

  const players = game?.currentPlayers || [];
  const playerCount = players.length;
  const maxPlayers = Number(game?.maxPlayers || 0);

  const hasJoined = Boolean(
    userId && players.some((player) => getId(player) === userId)
  );

  const isFull = maxPlayers > 0 && playerCount >= maxPlayers;
  const isCancelled = game?.status === 'cancelled';

  const handleJoin = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setJoining(true);
    setMessage('');
    setError('');

    try {
      const response = await gamesAPI.join(id);

      setMessage(response.message || 'You joined this game successfully!');
      await loadGame();
    } catch (err) {
      setError(err.message || 'Could not join this game.');
      await loadGame();
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    setJoining(true);
    setMessage('');
    setError('');

    try {
      const response = await gamesAPI.leave(id);

      setMessage(response.message || 'You left this game.');
      await loadGame();
    } catch (err) {
      setError(err.message || 'Could not leave this game.');
      await loadGame();
    } finally {
      setJoining(false);
    }
  };

  const formattedDate = game?.date
    ? new Date(game.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Date not specified';

  const hostName =
    typeof game?.host === 'object'
      ? game.host?.name || 'SportSphere member'
      : 'SportSphere member';

  const sportEmoji = sportIcons[game?.sport] || '🏆';

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 pt-36 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center py-24">
          <LoaderCircle className="h-10 w-10 animate-spin text-indigo-400" />
          <p className="mt-5 text-slate-400">Loading game details...</p>
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 pt-36 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-amber-400" />
          <h1 className="mt-5 text-2xl font-bold">Game Not Found</h1>
          <p className="mt-3 text-slate-400">
            {error || "Sorry, we couldn't find this game."}
          </p>
          <Link
            to="/games"
            className="mt-7 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
          >
            Browse Games
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-24 pt-28 text-white">
      <div className="mx-auto max-w-6xl">

        <Link
          to="/games"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Games
        </Link>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1.5fr_0.8fr]">

          <section>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-[#10162e] to-[#0a1020]">
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
                    {sportEmoji} {game.sport}
                  </span>

                  <span className={`rounded-full px-4 py-2 text-sm font-medium ${
                    isCancelled
                      ? 'bg-red-500/10 text-red-300'
                      : isFull
                      ? 'bg-amber-500/10 text-amber-300'
                      : 'bg-emerald-500/10 text-emerald-300'
                  }`}>
                    {isCancelled
                      ? 'Cancelled'
                      : isFull
                      ? 'Game Full'
                      : game.status || 'Open for players'}
                  </span>
                </div>

                <h1 className="mt-8 text-3xl font-bold leading-tight sm:text-5xl">
                  {game.title}
                </h1>

                <p className="mt-5 max-w-2xl leading-7 text-slate-400">
                  {game.description || 'Join this game, meet new players and enjoy playing together.'}
                </p>

                <div className="mt-9 grid gap-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <MapPin className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="mt-1 font-medium">{game.location}</p>
                      {game.city && (
                        <p className="mt-1 text-sm text-slate-400">{game.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <CalendarDays className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date</p>
                      <p className="mt-1 font-medium">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <Clock className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Starting time</p>
                      <p className="mt-1 font-medium">{game.time || 'Not specified'}</p>
                      {game.duration && (
                        <p className="mt-1 text-sm text-slate-400">{game.duration}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <Users className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Players</p>
                      <p className="mt-1 font-medium">
                        {playerCount} / {maxPlayers}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Players joining</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {playerCount} {playerCount === 1 ? 'person' : 'people'} joined so far
                  </p>
                </div>
                <Users className="h-6 w-6 text-indigo-400" />
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all"
                  style={{
                    width: `${maxPlayers > 0 ? Math.min((playerCount / maxPlayers) * 100, 100) : 0}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm text-slate-400">
                {Math.max(maxPlayers - playerCount, 0)} spots remaining
              </p>

              {players.length > 0 && (
                <div className="mt-7 space-y-4">
                  {players.map((player, index) => {
                    const name =
                      typeof player === 'object'
                        ? player.name || 'SportSphere player'
                        : 'SportSphere player';

                    const initials = name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    return (
                      <div
                        key={getId(player) || index}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 text-sm font-bold text-indigo-300">
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium">{name}</p>
                          {getId(player) === hostId && (
                            <p className="text-xs text-indigo-300">Game host</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15">
                  <UserRound className="h-6 w-6 text-indigo-300" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Hosted by</p>
                  <h2 className="font-semibold">{hostName}</h2>
                </div>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Available spots</span>
                <span className="font-semibold">
                  {Math.max(maxPlayers - playerCount, 0)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-400">Maximum players</span>
                <span className="font-semibold">{maxPlayers}</span>
              </div>

              <div className="my-6 border-t border-white/10" />

              {message && (
                <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {isHost ? (
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-center">
                  <ShieldCheck className="mx-auto h-6 w-6 text-indigo-300" />
                  <p className="mt-2 font-semibold text-indigo-200">You are the host</p>
                  <p className="mt-1 text-xs text-slate-400">
                    You created this game and are already included.
                  </p>
                </div>
              ) : hasJoined ? (
                <button
                  onClick={handleLeave}
                  disabled={joining}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {joining ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  )}
                  {joining ? 'Please wait...' : 'Leave Game'}
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining || isFull || isCancelled}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {joining && <LoaderCircle className="h-5 w-5 animate-spin" />}
                  {joining
                    ? 'Please wait...'
                    : isCancelled
                    ? 'Game Cancelled'
                    : isFull
                    ? 'Game Full'
                    : currentUser
                    ? 'Join This Game'
                    : 'Log In to Join'}
                </button>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Connect with players, show up and enjoy the game.
              </p>
            </div>

            <div className="rounded-3xl border border-indigo-500/15 bg-indigo-500/[0.06] p-6">
              <Trophy className="h-7 w-7 text-indigo-300" />
              <h3 className="mt-4 font-semibold">Play together</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                SportSphere helps you discover games and meet people who share your love for sports.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

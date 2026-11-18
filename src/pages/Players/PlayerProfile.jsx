
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, ArrowLeft, UserRound, Trophy } from 'lucide-react';
import { usersAPI } from '../../services/api';

export default function PlayerProfile() {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function fetchPlayer() {
      try {
        setLoading(true);
        setError('');

        const data = await usersAPI.getById(id);
        const user = data.user || data.data?.user || data;

        if (!user || !user._id) {
          throw new Error('Player profile could not be found.');
        }

        if (active) setPlayer(user);
      } catch (err) {
        if (active) {
          setPlayer(null);
          setError(err.message || 'Could not load player profile.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchPlayer();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-slate-300">
        Loading player profile...
      </main>
    );
  }

  if (error || !player) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Player not found</h1>
          <p className="mt-3 text-slate-400">
            {error || 'This player profile is unavailable.'}
          </p>
          <Link
            to="/players"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
          >
            <ArrowLeft size={18} />
            Back to Players
          </Link>
        </div>
      </main>
    );
  }

  const sports = player.sports || (player.sport ? [player.sport] : []);
  const initials = (player.name || 'Player')
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/players"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft size={17} />
          Back to Players
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

          <div className="h-32 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-blue-900/60" />

          <div className="px-6 pb-10 sm:px-10">

            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#050816] bg-indigo-600/25 text-3xl font-bold text-indigo-300">
                {initials}
              </div>

              <div className="pb-1">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  SportSphere Player
                </p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {player.name || 'Player'}
                </h1>
              </div>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={17} className="text-indigo-400" />
                  Location
                </div>
                <p className="mt-3 font-semibold">
                  {player.location || 'Location not added'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <UserRound size={17} className="text-indigo-400" />
                  Community Member
                </div>
                <p className="mt-3 font-semibold">SportSphere Player</p>
              </div>

            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2">
                <Trophy size={19} className="text-indigo-400" />
                <h2 className="text-xl font-bold">Sports</h2>
              </div>

              {sports.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {sports.map(sport => (
                    <span
                      key={sport}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-slate-400">No sports added yet.</p>
              )}
            </div>

            <div className="mt-8 border-t border-white/10 pt-7">
              <h2 className="text-xl font-bold">About</h2>
              <p className="mt-3 leading-7 text-slate-400">
                {player.bio || 'This player has not added a bio yet.'}
              </p>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

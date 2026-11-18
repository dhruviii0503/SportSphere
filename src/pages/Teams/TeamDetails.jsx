
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, CalendarDays } from 'lucide-react';
import { teamsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const data = await teamsAPI.getById(id);
      setTeam(data.team);
      setError('');
    } catch (e) {
      setError(e.message || 'Team not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(true);
  }, [id]);

  const members = team?.members || [];

  // Compare the logged-in user's ID with the populated member IDs.
  const currentUserId = user?._id || user?.id || user?.userId;

  const isMember = !!currentUserId && members.some((member) => {
    const memberId =
      typeof member === 'object'
        ? member._id || member.id || member.userId
        : member;

    return String(memberId) === String(currentUserId);
  });

  const captainId =
    typeof team?.captain === 'object'
      ? team.captain?._id || team.captain?.id
      : team?.captain;

  const isCaptain =
    !!currentUserId &&
    !!captainId &&
    String(captainId) === String(currentUserId);

  const count = members.length;
  const isFull = count >= (team?.maxMembers || Infinity);

  const join = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setBusy(true);
    setError('');

    try {
      await teamsAPI.join(id);
      await load();
    } catch (e) {
      setError(e.message || 'Could not join team');
    } finally {
      setBusy(false);
    }
  };

  const leave = async () => {
    if (!window.confirm('Are you sure you want to leave this team?')) {
      return;
    }

    setBusy(true);
    setError('');

    try {
      await teamsAPI.leave(id);
      await load();
    } catch (e) {
      setError(e.message || 'Could not leave team');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 pt-32 text-center text-slate-400">
        Loading team…
      </main>
    );
  }

  if (!team) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 pt-32 text-center text-white">
        <h1 className="text-3xl font-bold">Team unavailable</h1>
        <p className="mt-3 text-slate-400">{error}</p>
        <Link className="mt-6 inline-block text-indigo-400" to="/teams">
          Back to teams
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-20 pt-28 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/teams"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Link>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                {team.sport}
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {team.name}
              </h1>

              <p className="mt-3 text-slate-400">
                Led by {team.captain?.name || 'Community captain'}
              </p>
            </div>

            {isCaptain ? (
              <button
                disabled
                className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-7 py-3 font-semibold text-emerald-300"
              >
                Team Captain
              </button>
            ) : isMember ? (
              <button
                onClick={leave}
                disabled={busy}
                className="rounded-xl border border-red-400/30 bg-red-500/10 px-7 py-3 font-semibold text-red-300 hover:bg-red-500/20 disabled:opacity-50"
              >
                {busy ? 'Please wait…' : 'Leave Team'}
              </button>
            ) : (
              <button
                onClick={join}
                disabled={busy || isFull}
                className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50"
              >
                {busy ? 'Please wait…' : isFull ? 'Team Full' : 'Join Team'}
              </button>
            )}
          </div>

          <div className="mt-9 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">
            <p className="flex items-center gap-3 text-sm text-slate-300">
              <MapPin className="h-5 w-5 text-indigo-400" />
              {team.location || team.city || 'Location not specified'}
            </p>

            <p className="flex items-center gap-3 text-sm text-slate-300">
              <Users className="h-5 w-5 text-indigo-400" />
              {count} / {team.maxMembers} members
            </p>

            <p className="flex items-center gap-3 text-sm text-slate-300">
              <CalendarDays className="h-5 w-5 text-indigo-400" />
              {team.status === 'closed' ? 'Full' : 'Open for players'}
            </p>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-bold">About this team</h2>

          <p className="mt-4 leading-7 text-slate-400">
            {team.description || 'This team is building a local sports community.'}
          </p>

          <h2 className="mt-8 text-xl font-bold">Team members</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {members.map((member) => (
              <div
                key={member._id || member.id || member}
                className="rounded-xl border border-white/10 p-4"
              >
                <p className="font-medium">
                  {member.name || 'Team member'}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {member.location || 'SportSphere member'}
                </p>
              </div>
            ))}
          </div>

          {error && (
            <p className="mt-5 text-sm text-amber-300">{error}</p>
          )}
        </section>
      </div>
    </main>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, MapPin, CheckCircle2 } from "lucide-react";
import { teamsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function CreateTeam() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [sport, setSport] = useState("Football");
  const [location, setLocation] = useState("");
  const [maxMembers, setMaxMembers] = useState("10");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); setError('');
    if (!isAuthenticated) { navigate('/login'); return; }
    setSaving(true);
    try { await teamsAPI.create({ name: teamName, sport, location, city: location.split(',').slice(-1)[0].trim(), maxMembers: Number(maxMembers), description }); setCreated(true); }
    catch (err) { setError(err.message || 'Could not create team.'); }
    finally { setSaving(false); }
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-20 pt-28 text-white">

      <div className="mx-auto max-w-4xl">

        {/* BACK */}
        <Link
          to="/teams"
          className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Link>


        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Build Your Community
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Create Your Team.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Bring players together, create your own team and start
            building your sports community.
          </p>

        </div>


        {!created ? (

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10"
          >

            {error && <p className="mb-5 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
            {/* TEAM NAME */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Team Name
              </label>

              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Mumbai Football Crew"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />

            </div>


            {/* SPORT + MEMBERS */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Sport
                </label>

                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none focus:border-indigo-500"
                >
                  <option className="bg-[#080b1c]">
                    Football
                  </option>

                  <option className="bg-[#080b1c]">
                    Cricket
                  </option>

                  <option className="bg-[#080b1c]">
                    Badminton
                  </option>

                  <option className="bg-[#080b1c]">
                    Basketball
                  </option>

                  <option className="bg-[#080b1c]">
                    Volleyball
                  </option>

                  <option className="bg-[#080b1c]">
                    Tennis
                  </option>
                </select>

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Maximum Players
                </label>

                <select
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none focus:border-indigo-500"
                >
                  <option value="5" className="bg-[#080b1c]">
                    5 Players
                  </option>

                  <option value="8" className="bg-[#080b1c]">
                    8 Players
                  </option>

                  <option value="10" className="bg-[#080b1c]">
                    10 Players
                  </option>

                  <option value="12" className="bg-[#080b1c]">
                    12 Players
                  </option>

                  <option value="15" className="bg-[#080b1c]">
                    15 Players
                  </option>

                  <option value="20" className="bg-[#080b1c]">
                    20 Players
                  </option>
                </select>

              </div>

            </div>


            {/* LOCATION */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Team Location
              </label>

              <div className="relative">

                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Andheri, Mumbai"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-5 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

            </div>


            {/* DESCRIPTION */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                About Your Team
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell players what your team is about..."
                rows="5"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />

            </div>


            {/* PREVIEW */}
            <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>

                <div>

                  <p className="font-semibold">
                    {teamName || "Your Team Name"}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {sport} · {location || "Your Location"} ·
                    {" "}0 / {maxMembers} players
                  </p>

                </div>

              </div>

            </div>


            {/* SUBMIT */}
            <button
              type="submit"
              disabled={saving}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold transition hover:bg-indigo-500"
            >
              {saving ? 'Creating…' : 'Create Team'}
            </button>

          </form>

        ) : (

          /* SUCCESS */
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">

              <CheckCircle2 className="h-8 w-8 text-emerald-400" />

            </div>

            <h2 className="mt-6 text-3xl font-bold">
              Team Created Successfully!
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Your team has been created. You can now invite players
              and start building your sports community.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <button
                onClick={() => navigate("/teams")}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
              >
                Explore Teams
              </button>

              <button
                onClick={() => {
                  setCreated(false);
                  setTeamName("");
                  setLocation("");
                  setDescription("");
                }}
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/5"
              >
                Create Another Team
              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}

export default CreateTeam;
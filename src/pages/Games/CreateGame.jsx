import { useState } from "react";
import { gamesAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function CreateGame() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    sport: "Football",
    title: "",
    location: "",
    date: "",
    time: "",
    maxPlayers: "10",
    description: "",
  });

  const [created, setCreated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); setError('');
    if (!isAuthenticated) { navigate('/login'); return; }
    setSaving(true);
    try { await gamesAPI.create({ ...formData, maxPlayers: Number(formData.maxPlayers), city: formData.location.split(',').slice(-1)[0].trim() }); setCreated(true); }
    catch (err) { setError(err.message || 'Could not create game.'); }
    finally { setSaving(false); }
  };

  if (created) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-32 text-white">

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">
            ✓
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Game Created
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Your game is live! 🎉
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Players around you can now discover and join your game.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={() => navigate("/games")}
              className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold transition hover:bg-indigo-500"
            >
              Explore Games
            </button>

            <Link
              to="/"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 font-semibold transition hover:bg-white/10"
            >
              Back Home
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-24 pt-32 text-white">

      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-12">

          <Link
            to="/"
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            ← Back Home
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Your Game. Your Rules.
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Create Your Own Game
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Start a game in your area and let players around you
            discover and join.
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10"
        >

          {error && <p className="mb-5 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
          <div className="grid gap-6 md:grid-cols-2">

            {/* SPORT */}
            <div>

              <label className="text-sm font-semibold text-slate-300">
                Sport
              </label>

              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              >
                <option>Football</option>
                <option>Cricket</option>
                <option>Badminton</option>
                <option>Basketball</option>
                <option>Volleyball</option>
                <option>Tennis</option>
              </select>

            </div>


            {/* GAME TITLE */}
            <div>

              <label className="text-sm font-semibold text-slate-300">
                Game Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Friday Night Football"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
              />

            </div>


            {/* LOCATION */}
            <div className="md:col-span-2">

              <label className="text-sm font-semibold text-slate-300">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Andheri Sports Complex"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
              />

            </div>


            {/* DATE */}
            <div>

              <label className="text-sm font-semibold text-slate-300">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />

            </div>


            {/* TIME */}
            <div>

              <label className="text-sm font-semibold text-slate-300">
                Time
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              />

            </div>


            {/* MAX PLAYERS */}
            <div>

              <label className="text-sm font-semibold text-slate-300">
                Maximum Players
              </label>

              <select
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white outline-none transition focus:border-indigo-500"
              >
                <option value="4">4 Players</option>
                <option value="6">6 Players</option>
                <option value="8">8 Players</option>
                <option value="10">10 Players</option>
                <option value="12">12 Players</option>
                <option value="16">16 Players</option>
                <option value="22">22 Players</option>
              </select>

            </div>


            {/* DESCRIPTION */}
            <div className="md:col-span-2">

              <label className="text-sm font-semibold text-slate-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell players a little about your game..."
                rows="5"
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0b1023] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
              />

            </div>

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-500"
          >
            Publish Game
          </button>

        </form>

      </div>

    </main>
  );
}

export default CreateGame;
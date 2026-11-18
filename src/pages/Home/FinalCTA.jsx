import {
  ArrowRight,
  MapPin,
  Users,
  Trophy,
} from "lucide-react";

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-28 text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-5xl text-center">

        {/* Badge */}
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
          <Trophy size={16} />
          The game starts with you
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Stop Waiting for the
          <span className="block text-indigo-400">
            Perfect Team.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Find players around you, discover games, build your team,
          and turn your free time into your next great game.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-1 hover:bg-indigo-500 sm:w-auto">
            Find Players
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10 sm:w-auto">
            Create a Game
          </button>

        </div>

        {/* Mini Features */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">

          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <MapPin className="text-indigo-400" size={20} />
            <span className="text-sm text-slate-300">
              Find players near you
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Users className="text-indigo-400" size={20} />
            <span className="text-sm text-slate-300">
              Connect with your community
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Trophy className="text-indigo-400" size={20} />
            <span className="text-sm text-slate-300">
              Get out and play
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FinalCTA;
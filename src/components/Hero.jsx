import {
  MapPin,
  ChevronDown,
  Search,
  Users,
  CalendarDays,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-[650px] overflow-hidden bg-slate-950 text-white">
      
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-24 text-center lg:pt-32">

        {/* Small Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Your sports community starts here
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Find Your Game.
          <br />
          <span className="text-indigo-400">Find Your People.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Discover players, join games, build teams, and connect with people
          who love the sports you do — wherever you want to play.
        </p>

        {/* Search / Discovery Box */}
        <div className="mt-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">

          <div className="grid gap-3 lg:grid-cols-4">

            {/* Location */}
            <button className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 text-left transition hover:bg-white/15">
              <MapPin className="h-5 w-5 text-indigo-400" />

              <div className="flex-1">
                <p className="text-xs text-slate-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Choose your location
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {/* Sport */}
            <button className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 text-left transition hover:bg-white/15">
              <span className="text-xl">⚽</span>

              <div className="flex-1">
                <p className="text-xs text-slate-400">
                  Sport
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Choose a sport
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {/* Travel Distance */}
            <button className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 text-left transition hover:bg-white/15">
              <Users className="h-5 w-5 text-indigo-400" />

              <div className="flex-1">
                <p className="text-xs text-slate-400">
                  Travel Distance
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Up to 10 km
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {/* Find Button */}
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-500">
              <Search className="h-5 w-5" />
              Find Players
            </button>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/10">
            <Users className="h-4 w-4" />
            Find Players
          </button>

          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/10">
            <CalendarDays className="h-4 w-4" />
            Explore Games
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;
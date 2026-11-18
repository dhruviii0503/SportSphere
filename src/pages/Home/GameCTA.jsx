import {
  Plus,
  Search,
  MapPin,
  CalendarDays,
  Users,
  ArrowRight,
} from "lucide-react";

function GameCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-24 text-white">
      
      {/* Background Glow */}
      <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Main CTA */}
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/20 via-white/[0.04] to-purple-600/10 p-8 md:p-12 lg:p-16">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left Content */}
            <div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Your Game. Your Rules.
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Can't Find the Right Game?
                <span className="mt-2 block text-indigo-400">
                  Create Your Own.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                Start a game in your area, choose your sport, set the
                location and time, and let players around you discover
                and join.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <button className="group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-1 hover:bg-indigo-500">
                  <Plus size={19} />
                  Create a Game
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                  <Search size={19} />
                  Find a Game
                </button>

              </div>

            </div>


            {/* Right - Game Preview */}
            <div className="relative">

              <div className="rounded-3xl border border-white/10 bg-[#080b1c]/90 p-6 shadow-2xl backdrop-blur-xl">

                {/* Preview Header */}
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                      New Game
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Create Your Match
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                    <Plus size={20} />
                  </div>

                </div>


                {/* Preview Fields */}
                <div className="mt-7 space-y-4">

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
                      ⚽
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Sport
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        Football
                      </p>
                    </div>
                  </div>


                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-indigo-400">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        Andheri Sports Complex
                      </p>
                    </div>
                  </div>


                  <div className="grid grid-cols-2 gap-4">

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <CalendarDays
                        size={18}
                        className="text-indigo-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          Friday
                        </p>
                      </div>
                    </div>


                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <Users
                        size={18}
                        className="text-indigo-400"
                      />

                      <div>
                        <p className="text-xs text-slate-500">
                          Players
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          7 / 10
                        </p>
                      </div>
                    </div>

                  </div>

                </div>


                {/* Preview Button */}
                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3.5 text-sm font-semibold transition hover:bg-indigo-600">
                  Publish Game
                  <ArrowRight size={17} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default GameCTA;
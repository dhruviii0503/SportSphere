import { Link } from "react-router-dom";

function CreateGameCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/20 via-white/[0.03] to-transparent p-8 sm:p-12 lg:p-16">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Your Game. Your Rules.
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Can't Find the Right Game?
                <span className="block text-indigo-400">
                  Create Your Own.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                Start a game in your area, choose your sport, set the
                location and time, and let players around you discover
                and join.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/games/create"
                  className="rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-500"
                >
                  Create a Game
                </Link>

                <Link
                  to="/games"
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Find a Game
                </Link>

              </div>

            </div>


            {/* RIGHT - GAME PREVIEW */}
            <div className="rounded-3xl border border-white/10 bg-[#050816]/80 p-6 shadow-2xl sm:p-8">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                    New Game
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Create Your Match
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-2xl">
                  ⚽
                </div>

              </div>


              <div className="mt-8 space-y-5">

                <div>
                  <p className="text-sm text-slate-500">
                    Sport
                  </p>

                  <p className="mt-1 font-medium">
                    Football
                  </p>
                </div>


                <div>
                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 font-medium">
                    Andheri Sports Complex
                  </p>
                </div>


                <div className="grid grid-cols-2 gap-5">

                  <div>
                    <p className="text-sm text-slate-500">
                      Date
                    </p>

                    <p className="mt-1 font-medium">
                      Friday
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Players
                    </p>

                    <p className="mt-1 font-medium">
                      7 / 10
                    </p>
                  </div>

                </div>

              </div>


              <Link
                to="/games/create"
                className="mt-8 block rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-semibold transition hover:bg-indigo-600"
              >
                Publish Game
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CreateGameCTA;
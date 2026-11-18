import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-indigo-600 px-8 py-16 text-center sm:px-12 lg:px-20">

          {/* BACKGROUND DECORATION */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />


          {/* CONTENT */}
          <div className="relative mx-auto max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
              The game starts with you
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Stop Waiting for the
              <span className="block">
                Perfect Team.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
              Find players around you, discover games, build your team,
              and turn your free time into your next great game.
            </p>


            {/* BUTTONS */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                to="/players"
                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Find Players
              </Link>

              <Link
                to="/games/create"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition hover:bg-white/20"
              >
                Create a Game
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default FinalCTA;
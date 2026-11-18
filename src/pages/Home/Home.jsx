import { Link } from "react-router-dom";

import Hero from "../../components/Hero";
import MatchUpdates from "../../components/MatchUpdates";
import FeaturedPlayers from "../../components/players/FeaturedPlayers";
import PopularSports from "./PopularSports";
import HowItWorks from "../../components/HowItWorks";

function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* HERO */}
      <Hero />


      {/* GAMES HAPPENING AROUND YOU */}
      <MatchUpdates />


      {/* FEATURED PLAYERS */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <FeaturedPlayers />

        </div>

      </section>


      {/* POPULAR SPORTS */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <PopularSports />

        </div>

      </section>


      {/* HOW SPORTSPHERE WORKS */}
      <HowItWorks />


      {/* COMMUNITY / TEAMS SECTION */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Community
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Find Your Team.
              <span className="block text-indigo-400">
                Play Together.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-slate-400">
              Discover teams around you, meet new players, build your
              community, and find people who love the same sports you do.
            </p>


            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/teams"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                Find a Team
              </Link>

              <Link
                to="/teams/create"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Create a Team
              </Link>

            </div>


            <div className="mt-12 grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <div className="text-3xl">
                  ⚽
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Find Your People
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Meet players who share your passion and build your
                  perfect sports community.
                </p>

              </div>


              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <div className="text-3xl">
                  🏆
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Build Your Team
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Create your own team, invite players, and start
                  playing together.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-600/10 px-6 py-16 text-center sm:px-12">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              The game starts with you
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Find your people.
              <span className="block text-indigo-400">
                Get out and play.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-400">
              Find players, discover games, join teams, and build your
              sports community with SportSphere.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/players"
                className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                Find Players
              </Link>

              <Link
                to="/games"
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Games
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#03050f] px-6 py-14">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-4">

            {/* BRAND */}
            <div className="md:col-span-2">

              <h3 className="text-2xl font-bold">
                Sport<span className="text-indigo-400">Sphere</span>
              </h3>

              <p className="mt-4 max-w-md leading-7 text-slate-400">
                Find players. Discover games. Build your community.
                Get out there and play.
              </p>

            </div>


            {/* EXPLORE */}
            <div>

              <h4 className="font-semibold text-white">
                Explore
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">

                <Link
                  to="/players"
                  className="transition hover:text-white"
                >
                  Find Players
                </Link>

                <Link
                  to="/games"
                  className="transition hover:text-white"
                >
                  Games
                </Link>

                <Link
                  to="/games/create"
                  className="transition hover:text-white"
                >
                  Create a Game
                </Link>

                <Link
                  to="/teams"
                  className="transition hover:text-white"
                >
                  Teams
                </Link>

              </div>

            </div>


            {/* COMPANY */}
            <div>

              <h4 className="font-semibold text-white">
                Company
              </h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">

                <Link
                  to="/community"
                  className="transition hover:text-white"
                >
                  Community
                </Link>

                <Link
                  to="/about"
                  className="transition hover:text-white"
                >
                  About SportSphere
                </Link>

                <Link
                  to="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>

              </div>

            </div>

          </div>


          {/* COPYRIGHT */}
          <div className="mt-12 border-t border-white/10 pt-8">

            <p className="text-sm text-slate-500">
              © 2026 SportSphere. Built for the love of the game.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}

export default Home;
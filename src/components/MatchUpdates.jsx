import {
  MapPin,
  Clock3,
  Users,
  ArrowRight,
  CircleDot,
} from "lucide-react";

import { Link } from "react-router-dom";

const games = [
  {
    id: 1,
    sport: "Football",
    icon: "⚽",
    title: "Friday Night 5v5",
    location: "Andheri Sports Complex",
    distance: "4.2 km away",
    time: "Today · 7:00 PM",
    players: "7 / 10 Players",
    status: "3 spots left",
  },
  {
    id: 2,
    sport: "Cricket",
    icon: "🏏",
    title: "Weekend Cricket",
    location: "Powai Cricket Ground",
    distance: "8.5 km away",
    time: "Tomorrow · 8:00 AM",
    players: "8 / 12 Players",
    status: "4 spots left",
  },
  {
    id: 3,
    sport: "Badminton",
    icon: "🏸",
    title: "Evening Badminton",
    location: "SportZone Arena",
    distance: "6.1 km away",
    time: "Today · 6:30 PM",
    players: "2 / 4 Players",
    status: "2 spots left",
  },
];

function MatchUpdates() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-indigo-400">
              <CircleDot className="h-4 w-4" />
              LIVE DISCOVERY
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Games Happening Around You
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Discover games, matches, and activities that fit your sport,
              schedule, and preferred travel distance.
            </p>
          </div>

          {/* VIEW ALL GAMES */}
          <Link
            to="/games"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            View all games
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>


        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-3">

          <button className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white">
            All Games
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10">
            ⚽ Football
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10">
            🏏 Cricket
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10">
            🏸 Badminton
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10">
            🏀 Basketball
          </button>

        </div>


        {/* Game Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {games.map((game) => (

            <div
              key={game.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.07]"
            >

              {/* Sport */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                    {game.icon}
                  </div>

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {game.sport}
                    </p>

                    <h3 className="mt-1 font-semibold text-white">
                      {game.title}
                    </h3>

                  </div>

                </div>

                <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400">
                  Open
                </span>

              </div>


              {/* Game Details */}
              <div className="mt-7 space-y-4">

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                  <span>{game.location}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{game.distance}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Clock3 className="h-4 w-4 text-indigo-400" />
                  <span>{game.time}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Users className="h-4 w-4 text-indigo-400" />
                  <span>{game.players}</span>
                </div>

              </div>


              {/* Bottom */}
              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                <span className="text-sm font-medium text-slate-300">
                  {game.status}
                </span>


                {/* VIEW GAME */}
                <Link
                  to={`/games/${game.id}`}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  View Game

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default MatchUpdates;
import { Link } from "react-router-dom";

const players = [
  {
    id: 1,
    name: "Aarav Sharma",
    sport: "Football",
    location: "Andheri, Mumbai",
    distance: "3.2 km away",
    initials: "AS",
  },
  {
    id: 2,
    name: "Riya Mehta",
    sport: "Badminton",
    location: "Powai, Mumbai",
    distance: "5.8 km away",
    initials: "RM",
  },
  {
    id: 3,
    name: "Kabir Patel",
    sport: "Cricket",
    location: "Bandra, Mumbai",
    distance: "8.4 km away",
    initials: "KP",
  },
];

function FeaturedPlayers() {
  return (
    <section>

      {/* HEADER */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Meet Your Next Teammate
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Find Players Who
            <span className="block text-indigo-400">
              Match Your Game.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Discover players who share your sport and passion.
            Connect with people and find your perfect playing community.
          </p>

        </div>

        <Link
          to="/players"
          className="w-fit text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
        >
          Explore all players →
        </Link>

      </div>


      {/* PLAYER CARDS */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {players.map((player) => (

          <div
            key={player.id}
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
          >

            {/* PLAYER HEADER */}
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-lg font-bold text-indigo-300">
                {player.initials}
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {player.name}
                </h3>

                <p className="mt-1 text-sm text-indigo-400">
                  {player.sport}
                </p>

              </div>

            </div>


            {/* PLAYER DETAILS */}
            <div className="mt-6 space-y-3 text-sm text-slate-400">

              <p>
                📍 {player.location}
              </p>

              <p>
                📏 {player.distance}
              </p>

            </div>


            {/* VIEW PROFILE */}
            <Link
              to={`/player/${player.name.split(" ")[0]}`}
              className="mt-7 block rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-300 transition hover:bg-indigo-600 hover:text-white"
            >
              View Profile →
            </Link>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeaturedPlayers;
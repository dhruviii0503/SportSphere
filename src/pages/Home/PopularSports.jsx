import { Link } from "react-router-dom";

const sports = [
  {
    name: "Football",
    emoji: "⚽",
  },
  {
    name: "Cricket",
    emoji: "🏏",
  },
  {
    name: "Badminton",
    emoji: "🏸",
  },
  {
    name: "Basketball",
    emoji: "🏀",
  },
  {
    name: "Volleyball",
    emoji: "🏐",
  },
  {
    name: "Tennis",
    emoji: "🎾",
  },
];

function PopularSports() {
  return (
    <section className="bg-[#050816] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Find Your Sport
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Choose Your Game
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Pick a sport you love and discover players and games
            happening around you.
          </p>

        </div>


        {/* Sports */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

          {sports.map((sport) => (

            <Link
              key={sport.name}
              to={`/players?sport=${sport.name}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-indigo-500/10"
            >

              <div className="text-5xl transition duration-300 group-hover:scale-110">
                {sport.emoji}
              </div>

              <h3 className="mt-5 font-semibold">
                {sport.name}
              </h3>

              <p className="mt-2 text-xs text-slate-500 transition group-hover:text-indigo-300">
                Find Players →
              </p>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}

export default PopularSports;
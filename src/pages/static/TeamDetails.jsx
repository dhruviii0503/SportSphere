import { Link, useParams } from "react-router-dom";

const teams = [
  {
    id: 1,
    name: "Andheri Football Crew",
    sport: "Football",
    icon: "⚽",
    location: "Andheri, Mumbai",
    members: 8,
    maxMembers: 10,
    description:
      "A local football community looking for players to join regular games.",
    schedule: "Every Friday",
    time: "7:00 PM",
  },
  {
    id: 2,
    name: "Weekend Warriors",
    sport: "Cricket",
    icon: "🏏",
    location: "Powai, Mumbai",
    members: 9,
    maxMembers: 12,
    description:
      "Weekend cricket players looking to build a regular playing group.",
    schedule: "Every Saturday",
    time: "8:00 AM",
  },
  {
    id: 3,
    name: "Bandra Smashers",
    sport: "Badminton",
    icon: "🏸",
    location: "Bandra, Mumbai",
    members: 5,
    maxMembers: 8,
    description:
      "Badminton players connecting for regular games around Bandra.",
    schedule: "Every Wednesday",
    time: "6:30 PM",
  },
  {
    id: 4,
    name: "Mumbai Hoopers",
    sport: "Basketball",
    icon: "🏀",
    location: "Goregaon, Mumbai",
    members: 7,
    maxMembers: 10,
    description:
      "A community for basketball players looking for people to play with.",
    schedule: "Every Sunday",
    time: "6:00 PM",
  },
  {
    id: 5,
    name: "Serve Squad",
    sport: "Tennis",
    icon: "🎾",
    location: "Juhu, Mumbai",
    members: 4,
    maxMembers: 6,
    description:
      "Tennis players building a friendly local playing community.",
    schedule: "Every Saturday",
    time: "5:00 PM",
  },
  {
    id: 6,
    name: "Net Ninjas",
    sport: "Volleyball",
    icon: "🏐",
    location: "Andheri, Mumbai",
    members: 6,
    maxMembers: 10,
    description:
      "Volleyball players looking for teammates and regular games.",
    schedule: "Every Sunday",
    time: "7:00 PM",
  },
];

function TeamDetails() {
  const { id } = useParams();

  const team = teams.find((item) => item.id === Number(id));

  if (!team) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Team Not Found</h1>

          <p className="mt-4 text-slate-400">
            The team you're looking for doesn't exist.
          </p>

          <Link
            to="/teams"
            className="mt-7 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
          >
            Back to Teams
          </Link>
        </div>
      </main>
    );
  }

  const spotsLeft = team.maxMembers - team.members;
  const percentage = (team.members / team.maxMembers) * 100;

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-20 pt-28 text-white">

      {/* BACK */}
      <div className="mx-auto max-w-6xl">
        <Link
          to="/teams"
          className="text-sm font-medium text-slate-400 transition hover:text-white"
        >
          ← Back to Teams
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto mt-8 max-w-6xl">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-5">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-600/15 text-4xl">
                {team.icon}
              </div>

              <div>

                <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                  {team.sport}
                </span>

                <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                  {team.name}
                </h1>

                <p className="mt-3 text-slate-400">
                  📍 {team.location}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() => alert(`Join request sent to ${team.name}!`)}
              className="rounded-2xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-500"
            >
              Join Team
            </button>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-3">

        {/* ABOUT */}
        <div className="lg:col-span-2">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              About the Team
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {team.name}
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              {team.description}
            </p>

          </div>

          {/* PLAYING SCHEDULE */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Regular Games
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-500">
                  Schedule
                </p>

                <p className="mt-2 font-semibold">
                  📅 {team.schedule}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-500">
                  Game Time
                </p>

                <p className="mt-2 font-semibold">
                  🕐 {team.time}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* SIDEBAR */}
        <aside>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Team Capacity
            </p>

            <div className="mt-5 flex items-end justify-between">

              <div>
                <p className="text-4xl font-bold">
                  {team.members}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Current members
                </p>
              </div>

              <p className="text-sm text-slate-400">
                / {team.maxMembers}
              </p>

            </div>

            {/* PROGRESS */}
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-indigo-500"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            <p className="mt-4 text-sm text-slate-400">
              {spotsLeft > 0
                ? `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} available`
                : "Team is currently full"}
            </p>

            <button
              type="button"
              onClick={() => alert(`Join request sent to ${team.name}!`)}
              disabled={spotsLeft === 0}
              className={`mt-6 w-full rounded-xl px-5 py-3 font-semibold transition ${
                spotsLeft > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "cursor-not-allowed bg-white/10 text-slate-500"
              }`}
            >
              {spotsLeft > 0 ? "Join Team" : "Team Full"}
            </button>

          </div>

        </aside>

      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto mt-10 max-w-6xl">

        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/[0.06] p-8 text-center">

          <h2 className="text-2xl font-bold">
            Looking for more players?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Discover other players around you and find people who love
            the same sport.
          </p>

          <Link
            to="/players"
            className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Find Players
          </Link>

        </div>

      </section>

    </main>
  );
}

export default TeamDetails;
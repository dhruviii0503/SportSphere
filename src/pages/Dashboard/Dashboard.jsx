
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaFutbol,
  FaUsers,
  FaComments,
  FaPlus,
  FaArrowRight,
  FaMapMarkerAlt
} from 'react-icons/fa';

const actions = [
  {
    title: 'Discover Games',
    description: 'Find matches happening around you.',
    link: '/games',
    icon: FaFutbol,
    color: 'from-indigo-500 to-blue-500',
    label: 'Explore games'
  },
  {
    title: 'Find Players',
    description: 'Connect with people who love sports.',
    link: '/players',
    icon: FaUsers,
    color: 'from-cyan-500 to-teal-500',
    label: 'Find players'
  },
  {
    title: 'Explore Teams',
    description: 'Discover teams and become a member.',
    link: '/teams',
    icon: FaUsers,
    color: 'from-purple-500 to-pink-500',
    label: 'Explore teams'
  },
  {
    title: 'Community',
    description: 'Share updates and connect with players.',
    link: '/community',
    icon: FaComments,
    color: 'from-orange-500 to-rose-500',
    label: 'Visit community'
  }
];

function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Player';

  return (
    <main className="min-h-screen bg-[#050816] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        <section className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950 via-[#111a3b] to-[#080d20] p-8 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-indigo-300">
              <FaFutbol className="mr-2 inline" />
              Your Sports Dashboard
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Welcome back, <span className="text-indigo-300">{firstName}.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 md:text-lg">
              Your next game, your next team, your next connection.
              Get out there and play.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/games/create"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 font-bold transition hover:bg-indigo-400"
              >
                <FaPlus /> Create a Game
              </Link>

              <Link
                to="/games"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-bold transition hover:bg-white/10"
              >
                Explore Games <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
              Your next move
            </p>
            <h2 className="mt-2 text-3xl font-black">Explore SportSphere</h2>
            <p className="mt-2 text-gray-400">
              Everything you need to get into the game.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  to={action.link}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.07]"
                >
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-xl shadow-lg`}>
                    <Icon />
                  </div>

                  <h3 className="text-xl font-bold">{action.title}</h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-400">
                    {action.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-300">
                    {action.label}
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#101a36] to-[#11102c] p-7 md:p-9">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
                The game starts with you
              </p>

              <h2 className="mt-2 text-2xl font-black md:text-3xl">
                Got a game in mind?
              </h2>

              <p className="mt-2 text-gray-400">
                Create your own match and bring players together.
              </p>
            </div>

            <Link
              to="/games/create"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-[#080d20] transition hover:bg-indigo-100"
            >
              <FaPlus /> Create a Game
            </Link>
          </div>
        </section>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-500">
          <span>SportSphere · Find Your Game. Find Your People.</span>
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt /> Discover. Connect. Play.
          </span>
        </footer>

      </div>
    </main>
  );
}

export default Dashboard;

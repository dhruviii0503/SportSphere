import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03040d] px-6 py-16 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              Sport<span className="text-indigo-400">Sphere</span>
            </Link>

            <p className="mt-4 max-w-md leading-7 text-slate-400">
              Find players. Discover games. Build your community.
              Get out there and play.
            </p>

          </div>


          {/* EXPLORE */}
          <div>

            <h3 className="font-semibold text-white">
              Explore
            </h3>

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

            </div>

          </div>


          {/* COMMUNITY */}
          <div>

            <h3 className="font-semibold text-white">
              Community
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">

              <a
                href="#"
                className="transition hover:text-white"
              >
                Teams
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                Community
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                About SportSphere
              </a>

            </div>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 SportSphere. Built for the love of the game.
          </p>

          <p>
            Find your people. Find your game.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
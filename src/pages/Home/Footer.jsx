function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03050d] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              SportSphere
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Find players. Discover games. Build your community.
              Get out there and play.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">

            <a href="/players" className="transition hover:text-white">
              Find Players
            </a>

            <a href="/games" className="transition hover:text-white">
              Games
            </a>

            <a href="/teams" className="transition hover:text-white">
              Teams
            </a>

            <a href="/community" className="transition hover:text-white">
              Community
            </a>

          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6">

          <p className="text-sm text-slate-500">
            © 2026 SportSphere. Built for the love of the game.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
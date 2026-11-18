function About() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
          About SportSphere
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Built for the Love
          <span className="block text-indigo-400">
            of the Game.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          SportSphere is a sports community platform designed to help people
          find players, discover games, create teams, and connect with others
          who share their passion for sports.
        </p>
      </div>
    </main>
  );
}

export default About;
const steps = [
  {
    number: "01",
    title: "Choose Your Sport & Location",
    description:
      "Select the sport you want to play, choose your location, and decide how far you're willing to travel.",
    points: [
      "Choose from multiple sports",
      "Use your current location or search manually",
      "Set your preferred travel distance",
    ],
  },
  {
    number: "02",
    title: "Discover Players & Games",
    description:
      "Find players who are looking to play, discover upcoming games, and explore sports opportunities around your area.",
    points: [
      "Discover players based on your preferences",
      "Find games and matches you can join",
      "Explore teams and sports communities",
    ],
  },
  {
    number: "03",
    title: "Connect & Play",
    description:
      "Connect with players, join a game or create your own, build teams, and get out there to play.",
    points: [
      "Connect with other players",
      "Join or create games",
      "Build teams and communities",
    ],
  },
];

function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Simple. Social. Sporty.
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How SportSphere Works
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-400">
            From finding the right players to stepping onto the field,
            SportSphere makes it easier to find your people and play
            the sports you love.
          </p>

        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">

          {steps.map((step) => (

            <div
              key={step.number}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
            >

              <span className="text-sm font-bold text-indigo-400">
                {step.number}
              </span>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Step {step.number}
              </p>

              <h3 className="mt-6 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {step.description}
              </p>

              <div className="mt-6 space-y-3">

                {step.points.map((point) => (

                  <div
                    key={point}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <span className="mt-0.5 text-indigo-400">
                      ✓
                    </span>

                    <span>{point}</span>
                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
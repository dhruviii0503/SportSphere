import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState("");
  const [sport, setSport] = useState("Football");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("10");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      teamName.trim() === "" ||
      location.trim() === ""
    ) {
      return;
    }

    alert("Your team has been created successfully!");

    navigate("/teams");
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-20 pt-28 text-white">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Build Your Community
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Create Your Team.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Bring players together, create your own team, and start
            playing the sport you love.
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >

          {/* TEAM NAME */}
          <div>

            <label className="text-sm font-medium text-slate-300">
              Team Name
            </label>

            <input
              type="text"
              value={teamName}
              onChange={(e) =>
                setTeamName(e.target.value)
              }
              placeholder="Enter your team name"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
              required
            />

          </div>


          {/* SPORT */}
          <div className="mt-6">

            <label className="text-sm font-medium text-slate-300">
              Sport
            </label>

            <select
              value={sport}
              onChange={(e) =>
                setSport(e.target.value)
              }
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none focus:border-indigo-500"
            >
              <option
                value="Football"
                className="bg-[#080b1c]"
              >
                ⚽ Football
              </option>

              <option
                value="Cricket"
                className="bg-[#080b1c]"
              >
                🏏 Cricket
              </option>

              <option
                value="Badminton"
                className="bg-[#080b1c]"
              >
                🏸 Badminton
              </option>

              <option
                value="Basketball"
                className="bg-[#080b1c]"
              >
                🏀 Basketball
              </option>

              <option
                value="Volleyball"
                className="bg-[#080b1c]"
              >
                🏐 Volleyball
              </option>

              <option
                value="Tennis"
                className="bg-[#080b1c]"
              >
                🎾 Tennis
              </option>

            </select>

          </div>


          {/* LOCATION */}
          <div className="mt-6">

            <label className="text-sm font-medium text-slate-300">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="e.g. Andheri, Mumbai"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
              required
            />

          </div>


          {/* MEMBERS */}
          <div className="mt-6">

            <label className="text-sm font-medium text-slate-300">
              Maximum Team Members
            </label>

            <select
              value={members}
              onChange={(e) =>
                setMembers(e.target.value)
              }
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none focus:border-indigo-500"
            >
              <option
                value="5"
                className="bg-[#080b1c]"
              >
                5 Members
              </option>

              <option
                value="10"
                className="bg-[#080b1c]"
              >
                10 Members
              </option>

              <option
                value="15"
                className="bg-[#080b1c]"
              >
                15 Members
              </option>

              <option
                value="20"
                className="bg-[#080b1c]"
              >
                20 Members
              </option>

              <option
                value="30"
                className="bg-[#080b1c]"
              >
                30 Members
              </option>

            </select>

          </div>


          {/* DESCRIPTION */}
          <div className="mt-6">

            <label className="text-sm font-medium text-slate-300">
              About Your Team
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Tell players what your team is about..."
              rows="5"
              className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
            />

          </div>


          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              className="flex-1 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-500"
            >
              Create Team
            </button>

            <button
              type="button"
              onClick={() => navigate("/teams")}
              className="rounded-2xl border border-white/10 px-6 py-4 font-semibold text-slate-300 transition hover:bg-white/10"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default CreateTeam;
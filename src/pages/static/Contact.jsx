function Contact() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-32 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Contact SportSphere
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Let's Connect.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Have a question, suggestion, or feedback? We'd love to hear from
            you.
          </p>
        </div>

        <form className="mt-12 space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}

export default Contact;
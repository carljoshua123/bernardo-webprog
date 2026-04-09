export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 fade-in">

      <h1 className="text-4xl font-bold">About</h1>

      <p className="mt-4 text-zinc-400 text-lg">
        Wet Carbon is designed to help developers and designers rapidly prototype layouts
        using modern tools like React and Tailwind CSS.
      </p>

      {/* IMAGE ADDED */}
      <div className="mt-8 h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
        <img
          src="/src/assets/team.png"
          alt="Our Team"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="mt-6 text-zinc-400">
        Our goal is to simplify UI creation and improve development workflows.
      </p>

    </div>
  );
}

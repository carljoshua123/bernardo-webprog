import bgImage from "../assets/bg.png";

function AuthLayout({ children, title, subtitle }) {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.6),rgba(12,18,32,0.28))]" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/20 bg-white/12 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Wet Carbon Garage
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
          {subtitle ? (
            <p className="text-sm leading-6 text-white/74 sm:text-base">{subtitle}</p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

export default AuthLayout;
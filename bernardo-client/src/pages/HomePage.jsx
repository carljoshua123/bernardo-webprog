import image from "../assets/image.png";
import adv from "../assets/adv.png";
import nmax from "../assets/nmax.png";
import aerox from "../assets/aerox.png";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 fade-in">

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Wet Carbon
          </h1>
          <p className="mt-4 text-zinc-400 text-lg">
            Premium carbon fiber motorcycle parts designed for riders who want lightweight performance, strength, and a clean, aggressive look. Upgrade your bike with components built for speed and durability.
          </p>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">
            Learn More
          </button>
        </div>

        <div className="h-[600px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <img
            src={image}
            alt="Carbon fiber motorcycle parts"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Ultra Lightweight", "High Strength", "Heat Resistant", "Race Inspired"].map((item, i) => (
          <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center font-bold text-zinc-200">
            {item}
          </div>
        ))}
      </section>

      {/* MOTORCYCLE CARDS WITH IMAGES */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "HONDA ADV 160",
            image: adv,
            desc: "Upgrade your ADV 160 with precision-crafted carbon fiber fairings for improved aerodynamics, lighter weight, and a bold premium finish."
          },
          {
            title: "YAMAHA NMAX V2",
            image: nmax,
            desc: "Enhance durability and heat resistance with carbon fiber covers built to protect and elevate the sleek design of your NMAX."
          },
          {
            title: "YAMAHA AEROX",
            image: aerox,
            desc: "Transform your Aerox with aggressive carbon fiber panels and fenders designed for performance, style, and street dominance."
          }
        ].map((card, i) => (
          <div key={i} className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl hover:border-blue-500/50 transition-all duration-500 group">
            <div className="h-64 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
              <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

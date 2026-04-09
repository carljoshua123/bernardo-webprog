import { useParams } from "react-router-dom";
import Button from "../components/Button";
import articles from "../assets/article-content.js";

const previewCards = [
  {
    title: "CARBON CLASSIC",
    image: "/src/assets/adv1.png",
    desc: "A clean carbon finish with a lightweight, premium look.",
  },
  {
    title: "CARBON FORGED",
    image: "/src/assets/maxie.png",
    desc: "Forged carbon texture designed for a sharper, modern style.",
  },
  {
    title: "CARBON RACE",
    image: "/src/assets/aerox1.png",
    desc: "Bold carbon layering with a more aggressive visual finish.",
  },
];

function PreviewGrid({ className = "grid md:grid-cols-3 gap-6", compact = false }) {
  return (
    <div className={className}>
      {previewCards.map((card, i) => (
        <div
          key={i}
          className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl hover:border-blue-500/50 transition-all duration-500 group"
        >
          <div className={compact ? "h-48 overflow-hidden" : "h-64 overflow-hidden"}>
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          <div className={compact ? "p-4" : "p-6"}>
            <h3 className={compact ? "text-lg font-bold text-white" : "text-xl font-bold text-white"}>
              {card.title}
            </h3>
            <p className={compact ? "mt-2 text-sm leading-6 text-zinc-400" : "text-sm text-zinc-400 mt-3"}>
              {card.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((item) => item.name === name);

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 fade-in space-y-10">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
              The article you are looking for does not exist or the URL does not match any available build story.
            </p>
            <div className="mt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8 text-white">Carbon Collection</h2>
          <PreviewGrid />
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 fade-in space-y-10">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
            {article.desc}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200 mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4 text-zinc-700">
              {article.content.map((paragraph, index) => (
                <p key={index} className="text-base leading-7 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 border-t-2 border-zinc-900 pt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>

          <aside>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              More Builds
            </p>
            <PreviewGrid
              compact
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
            />
          </aside>
        </div>
      </section>
    </div>
  );
}
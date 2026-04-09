import Button from "./Button";

const ArticleList = ({ articles = [] }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.name}
          className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.14)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
            {article.image ? (
              <>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-zinc-500">
                No image available
              </div>
            )}

            <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-800 shadow-sm">
              Feature
            </div>
          </div>

          <div className="space-y-5 p-6 text-left">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Carbon Story
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] text-zinc-950">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {article.desc ?? article.content?.[0]}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                Open Article
              </span>
              <Button to={`/articles/${article.name}`} className="px-5 py-2.5 text-sm">
                Read More
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
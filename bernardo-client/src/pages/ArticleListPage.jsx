import { useState, useEffect } from 'react';
import Button from '../components/Button';
import ArticleList from '../components/ArticleList.jsx';
import { fetchArticles } from '../services/ArticleService.js';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetchArticles();
      // Filter to show only Active articles
      const activeArticles = response.data.filter(a => a.status === 'Active');
      setArticles(activeArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  return (
    <div className="flex w-full flex-col gap-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_34%),linear-gradient(135deg,#101114_0%,#171a21_52%,#0c0d10_100%)] text-left shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-200/80">
              Wet Carbon Journal
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Carbon stories, finish notes, and premium detail guides.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
              Explore curated articles about carbon finish, forged textures, fitment quality, and the details that make a build feel refined instead of ordinary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/">Back Home</Button>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-zinc-300">
                {articles.length} Featured Articles
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {articles.slice(0, 4).map((article) => (
              <div
                key={article._id || article.slug}
                className="relative min-h-40 overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/80"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="relative flex h-full items-end p-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200/75">
                      Carbon Note
                    </p>
                    <h2 className="mt-2 text-lg font-semibold leading-tight text-white">
                      {article.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-zinc-50/98 px-5 py-6 text-left shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Featured Articles
            </p>
            <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Editorial-style carbon insights with stronger visual hierarchy.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-600 sm:text-right">
            A cleaner presentation for article previews, images, and actions so the section feels like a finished brand page instead of a placeholder wireframe.
          </p>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
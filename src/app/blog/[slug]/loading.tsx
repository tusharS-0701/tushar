export default function ArticleLoading() {
  return <main className="article-route-skeleton" aria-busy="true" aria-label="Loading article">
    <div className="skeleton-article-main"><span className="skeleton-line short" /><span className="skeleton-article-title" /><span className="skeleton-article-title small" /><span className="skeleton-line" /><span className="skeleton-line medium" /><span className="skeleton-byline" /><span className="skeleton-cover" />{Array.from({ length: 8 }, (_, index) => <span className={`skeleton-line${index % 3 === 2 ? ' medium' : ''}`} key={index} />)}</div>
    <aside>{Array.from({ length: 5 }, (_, index) => <span className="skeleton-line" key={index} />)}</aside>
  </main>
}

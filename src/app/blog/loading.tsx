export default function BlogLoading() {
  return <main className="blog-route-skeleton" aria-busy="true" aria-label="Loading articles">
    <aside><span className="skeleton-line short" /><span className="skeleton-title" /><span className="skeleton-line" />{Array.from({ length: 6 }, (_, index) => <span className="skeleton-filter" key={index} />)}</aside>
    <div><section className="skeleton-blog-hero"><span className="skeleton-heading" /><span className="skeleton-heading small" /><span className="skeleton-line" /><span className="skeleton-line medium" /></section><section className="skeleton-feature" /><section className="skeleton-card-row">{Array.from({ length: 3 }, (_, index) => <span key={index} />)}</section></div>
  </main>
}

export function QuoteBox({ text, author }: { text: string; author: string }) {
  return (
    <div className="footer-quote">
      &ldquo;{text}&rdquo;
      <span>&mdash; {author}</span>
    </div>
  )
}

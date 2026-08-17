export function FooterColumn({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="footer-heading">{heading}</p>
      {children}
    </div>
  )
}

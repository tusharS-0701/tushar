export function SignatureText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`signature ${className}`}>{children}</p>
}

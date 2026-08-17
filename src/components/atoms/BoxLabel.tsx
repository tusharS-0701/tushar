export function BoxLabel({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="box-label">
      <span>{title}</span>
      <small>{tag}</small>
    </div>
  )
}

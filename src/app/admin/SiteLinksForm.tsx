import type { SiteLinks } from '../../lib/posts'
import { updateSiteLinks } from './actions'

const fields: { key: keyof SiteLinks; label: string; type?: string; placeholder: string }[] = [
  { key: 'x', label: 'X / Twitter', placeholder: 'https://x.com/your-handle' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/your-handle' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/your-profile' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/your-handle' },
  { key: 'email', label: 'Contact email', type: 'email', placeholder: 'you@example.com' },
  { key: 'resume', label: 'Résumé', placeholder: 'https://example.com/resume.pdf' },
  { key: 'support', label: 'Support / coffee', placeholder: 'https://buymeacoffee.com/your-handle' },
]

export function SiteLinksForm({ links }: { links: SiteLinks }) {
  return <form action={updateSiteLinks} className="admin-form admin-form-wrap">
    <div className="admin-form-grid">
      {fields.map(({ key, label, type = 'url', placeholder }) => <label className="admin-field" key={key}>
        <span>{label}</span>
        <input name={key} type={type} defaultValue={links[key]} placeholder={placeholder} required={key === 'email'} />
      </label>)}
    </div>
    <div className="admin-form-actions"><button className="admin-primary-button" type="submit">Save site links</button></div>
  </form>
}

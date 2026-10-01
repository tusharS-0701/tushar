import type { BlogSettings } from '../../lib/posts'
import { updateBlogSettings } from './actions'

const fields: { key: keyof BlogSettings; label: string; rows?: number }[] = [
  { key: 'sidebarTitle', label: 'Sidebar heading' },
  { key: 'sidebarDescription', label: 'Sidebar description', rows: 3 },
  { key: 'quote', label: 'Sidebar quote', rows: 3 },
  { key: 'quoteAuthor', label: 'Quote author' },
  { key: 'heroTitle', label: 'Hero heading' },
  { key: 'heroDescription', label: 'Hero description', rows: 3 },
  { key: 'newsletterTitle', label: 'Newsletter heading' },
  { key: 'newsletterDescription', label: 'Newsletter description', rows: 3 },
]

export function BlogSettingsForm({ settings }: { settings: BlogSettings }) {
  return <form action={updateBlogSettings} className="admin-form admin-form-wrap">
    <div className="admin-form-grid">{fields.map(({ key, label, rows }) => <label className={`admin-field${rows ? ' admin-field--wide' : ''}`} key={key}><span>{label}</span>{rows ? <textarea name={key} defaultValue={settings[key]} rows={rows} required maxLength={500} /> : <input name={key} defaultValue={settings[key]} required maxLength={180} />}</label>)}</div>
    <div className="admin-form-actions"><button className="admin-primary-button" type="submit">Save blog content</button></div>
  </form>
}

import type { Post } from '../../lib/posts'
import { deletePost, upsertPost } from './actions'
import { DeleteButton } from './DeleteButton'

export function PostForm({ post }: { post?: Post }) {
  return <div className="admin-form-wrap">
    <form action={upsertPost} className="admin-form">
      {post && <input type="hidden" name="previousSlug" value={post.slug} />}
      <div className="admin-form-grid">
        <label className="admin-field admin-field--wide"><span>Title</span><input name="title" defaultValue={post?.title} required minLength={3} maxLength={140} placeholder="Article title" /></label>
        <label className="admin-field"><span>Slug <small>Generated from the title if empty</small></span><input name="slug" defaultValue={post?.slug} maxLength={80} placeholder="article-url-slug" /></label>
        <label className="admin-field"><span>Status</span><select name="status" defaultValue={post?.status || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="admin-field admin-field--wide"><span>SEO description <small>20–320 characters</small></span><textarea name="description" defaultValue={post?.description} required minLength={20} maxLength={320} rows={3} placeholder="A concise summary for readers and search engines." /></label>
        <label className="admin-field admin-field--wide"><span>Tags <small>Comma separated</small></span><input name="tags" defaultValue={post?.tags.join(', ')} placeholder="engineering, nextjs, learning" /></label>
        <label className="admin-field admin-field--wide"><span>Body <small>Markdown is supported</small></span><textarea className="admin-body-field" name="body" defaultValue={post?.body} required minLength={20} rows={20} placeholder="Write your article here…" /></label>
      </div>
      <div className="admin-form-actions"><button type="submit" className="admin-primary-button">{post ? 'Save changes' : 'Save post'}</button></div>
    </form>
    {post && <form action={deletePost} className="admin-delete-form"><input type="hidden" name="slug" value={post.slug} /><DeleteButton /></form>}
  </div>
}

'use server'

import { redirect } from 'next/navigation'
import { getDatabaseStatus, subscribeToBlog } from '../../lib/posts'

export async function subscribe(data: FormData) {
  const email = String(data.get('email') || '').trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || await getDatabaseStatus() !== 'ready') redirect('/blog?subscribeError=1#newsletter')
  await subscribeToBlog(email)
  redirect('/blog?subscribed=1#newsletter')
}

import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const cookieName = 'blog_admin'
const lifetimeSeconds = 60 * 60 * 24 * 7

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32,
  )
}

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters.')
  return value
}

function signature(expires: string) {
  return createHmac('sha256', secret()).update(expires).digest('hex')
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD
  if (!isAdminConfigured() || !expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function setAdminSession() {
  const expires = String(Date.now() + lifetimeSeconds * 1000)
  ;(await cookies()).set(cookieName, `${expires}.${signature(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: lifetimeSeconds,
  })
}

export async function clearAdminSession() {
  ;(await cookies()).delete(cookieName)
}

export async function isAdmin() {
  if (!isAdminConfigured()) return false
  const value = (await cookies()).get(cookieName)?.value
  if (!value) return false
  const [expires, provided] = value.split('.')
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now() || !provided) return false
  const expected = Buffer.from(signature(expires), 'hex')
  const actual = Buffer.from(provided, 'hex')
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

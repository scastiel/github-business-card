import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export interface User {
  login: string
  name: string
  bio: string
  avatar_url: string
  company: string
  location: string
  created_at: string
  twitter_username: string
  following: any
  followers: number
  contribs: number[][]
}

export default async function handle(req: NextRequest) {
  const { pathname } = new URL(req.url)
  const [, username] = pathname.match(/^\/api\/gh\/([^\/]+)/) || []

  if (!username)
    return NextResponse.json(
      { error: 'No username provided.' },
      { status: 400, statusText: 'Bad Request' }
    )

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}` },
  })
  if (res.status === 404) {
    return NextResponse.json(
      { error: `No GitHub user with username “${username}”.` },
      { status: 404, statusText: 'Not Found' }
    )
  }
  if (res.status !== 200) {
    try {
      const json = await res.json()
      console.log(json.message)
    } catch (_) {}
    return NextResponse.json(
      { error: 'An error occurred when fetching information about the user.' },
      { status: 500, statusText: 'Internal Server Error' }
    )
  }
  const user = await res.json()
  const contribs = await getContribsByWeek(username)

  return NextResponse.json(
    {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      company: user.company,
      location: user.location,
      created_at: user.created_at,
      twitter_username: user.twitter_username,
      following: user.following,
      followers: user.followers,
      contribs: contribs,
    } as User,
    { headers: { 'cache-control': 'public, max-age=60' } }
  )
}

async function getContribsByWeek(username: string) {
  const res = await fetch(`https://github.com/${username}`)
  const html = await res.text()

  const regex = /data-date="(.*?)" data-level="(.*?)"/g
  let match: RegExpExecArray | null = null
  const contribs = []
  while ((match = regex.exec(html)) !== null) {
    contribs.push(Number(match[2]))
  }

  const contribsByWeek = []
  for (let i = 0; i <= contribs.length / 7; i++) {
    contribsByWeek.push(contribs.slice(i * 7, (i + 1) * 7))
  }

  return contribsByWeek
}

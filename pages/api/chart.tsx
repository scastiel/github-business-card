import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handle(req: NextRequest) {
  const username = 'scastiel'
  const res = await fetch(`https://github.com/${username}`)
  const html = await res.text()

  const regex = /data-date=".*?" data-level="(.*?)"/g
  let match: RegExpExecArray | null = null
  const contribs = []
  while ((match = regex.exec(html)) !== null) {
    contribs.push(Number(match[1]))
  }

  const contribsByWeek = []
  for (let i = 0; i <= contribs.length / 7; i++) {
    contribsByWeek.push(contribs.slice(i * 7, (i + 1) * 7))
  }

  return NextResponse.json(contribsByWeek)
}

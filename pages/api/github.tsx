import { NextRequest, NextResponse } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handle(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const dark = searchParams.has('dark')
  const removeLink = searchParams.has('removeLink')
  const noBorder = searchParams.has('noBorder')

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/i/${username || ''}?${[
      dark && 'dark',
      removeLink && 'removeLink',
      noBorder && 'noBorder',
    ]
      .filter(Boolean)
      .join('&')}`
  )
}

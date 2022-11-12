/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 628

export default async function handle(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return errorResponse('No username provided.')
  }

  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `Basic ${process.env.GITHUB_PERSONAL_TOKEN}` },
  })
  if (res.status === 404) {
    return errorResponse(`No GitHub user with username “${username}”.`)
  }
  if (res.status !== 200) {
    return errorResponse(
      'An error occurred when fetching information about the user.'
    )
  }
  const user = await res.json()

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center p-8">
        <div tw="bg-white w-full h-full flex text-2xl items-center shadow-xl">
          <div tw="flex w-1/3 justify-end pb-12 mr-12">
            <div tw="flex flex-col items-center">
              <img
                src={user.avatar_url}
                tw="w-64 h-64 rounded-full shadow-2xl mb-4"
                style={{ objectPosition: 'center', objectFit: 'cover' }}
              />
              <div tw="text-xl text-slate-500">{`Since ${new Date(
                user.created_at
              ).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}`}</div>
            </div>
          </div>
          <div tw="flex w-2/3 flex-col pr-16">
            <div tw="text-7xl">{user.name}</div>
            <div tw="text-3xl text-slate-600 mb-2 flex">
              <span tw="text-slate-400">github.com/</span>
              {user.login}
            </div>
            {user.bio && (
              <div tw="text-3xl">
                {user.bio
                  .replace(
                    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                    ''
                  )
                  .trim()}
              </div>
            )}
            <div tw="flex mb-2 mt-8">
              👾{' '}
              {user.followers <= 1
                ? `${user.followers} follower`
                : `${user.followers} followers`}{' '}
              · {`${user.following} following`}
            </div>
            <div tw="flex flex-wrap">
              {user.company && <div tw="flex mb-2 mr-4">🏢 {user.company}</div>}
              {user.location && (
                <div tw="flex mb-2 mr-4">📍 {user.location}</div>
              )}
              {user.twitter_username && (
                <div tw="flex mb-2">🕊 @{user.twitter_username}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    }
  )
}

function errorResponse(message: string): ImageResponse {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col p-4 items-center justify-center">
        <div tw="flex flex-col items-stretch rounded-xl shadow-2xl min-w-1/2">
          <div tw="text-3xl bg-red-600 text-white px-4 py-2 rounded-t-xl">
            Error
          </div>
          <div tw="text-xl border border-red-600 p-4 rounded-b-xl bg-white">
            {message}
          </div>
        </div>
      </div>
    ),
    { width: IMAGE_WIDTH, height: IMAGE_HEIGHT }
  )
}

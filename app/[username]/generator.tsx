/* eslint-disable @next/next/no-img-element */
'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { pageTitle } from '../seo-headers'
import { randomTopUsername } from '../top-users'
import { CopyInput } from './copy-input'

export default function Generator() {
  const [username, setUsername] = useUsername()
  const [dark, setDark] = useState(false)
  const [tempUsername, setTempUsername] = useState(username)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    if (!username) {
      const randomUser = randomTopUsername()
      setUsername(randomUser, false)
      setTempUsername(randomUser)
    }
  }, [setUsername, username])

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setUsername(tempUsername)
        }}
        className="flex flex-col space-y-1 p-2"
      >
        <label htmlFor="username">Your GitHub username:</label>
        <div className="flex space-x-2">
          <input
            id="username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            required
          />
          <button type="submit">Go</button>
        </div>
      </form>

      <div className="text-center text-sm text-slate-700">
        Here is your GitHub business card:
        <br />
        <small>(it’s an image!)</small>
      </div>

      {isBrowser && (
        <div className="relative">
          <div className="z-0 absolute inset-0 flex justify-center items-center text-slate-600 text-sm">
            Loading… (can take a few seconds)
          </div>
          <div className="z-10 relative">
            <div
              dangerouslySetInnerHTML={{
                __html: htmlCodeForUserName(username, dark),
              }}
            />
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <div className="flex space-x-2 items-center">
          <input
            id="dark"
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
          <label htmlFor="dark">Dark mode</label>
        </div>
        <a
          href={imageUrlForUsername(username, dark)}
          download={`${username}-github-business-card.png`}
          className="button"
        >
          Download
        </a>
      </div>

      <div className="flex flex-col space-y-4 w-full max-w-md p-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="imageUrl">Image URL:</label>
          <CopyInput
            id="imageUrl"
            readOnly
            value={imageUrlForUsername(username, dark)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="htmlCode">Embed HTML code:</label>
          <CopyInput
            id="htmlCode"
            readOnly
            value={htmlCodeForUserName(username, dark)}
          />
        </div>
        <div className="flex flex-col space-y-1 items-stretch">
          <label htmlFor="markdownCode">Embed Markdown code:</label>
          <CopyInput
            id="markdownCode"
            readOnly
            value={markdownCodeForUserName(username, dark)}
          />
        </div>
      </div>
    </>
  )
}

function imageUrlForUsername(username: string, dark: boolean) {
  return `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/github?username=${encodeURIComponent(username)}${dark ? '&dark' : ''}`
}

function imageAltForUsername(username: string) {
  return `${username}’s GitHub image`
}

function htmlCodeForUserName(username: string, dark: boolean) {
  const imageUrl = imageUrlForUsername(username, dark)
  const imageAlt = imageAltForUsername(username)
  return `<a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" alt="${imageAlt}" width="600" height="314" />`
}

function markdownCodeForUserName(username: string, dark: boolean) {
  const imageUrl = imageUrlForUsername(username, dark)
  const imageAlt = imageAltForUsername(username)
  return `![${imageAlt}](${imageUrl})`
}

function useUsername(): [
  string,
  (username: string, updateUrl?: boolean) => void
] {
  const router = useRouter()
  const pathname = usePathname()!
  const [user, setUser] = useState(pathname.replace(/^\//, ''))

  const setUsername = (username: string, updateUrl = true) => {
    if (updateUrl) {
      router.replace(`/${username}`)
      document.title = pageTitle(username)
    }
    setUser(username)
  }

  return [user, setUsername]
}

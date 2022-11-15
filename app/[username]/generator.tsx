/* eslint-disable @next/next/no-img-element */
'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { pageTitle } from '../seo-headers'
import { randomTopUsername } from '../top-users'
import { CopyInput } from './copy-input'

export default function Generator() {
  const [username, setUsername] = useUsername()
  const [dark, setDark] = useState(false)
  const [removeLink, setRemoveLink] = useState(false)
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
          <div className="z-0 absolute inset-0 flex justify-center items-center text-slate-400 text-sm">
            Loading… (can take a few seconds)
          </div>
          <div className="z-10 relative">
            <div
              dangerouslySetInnerHTML={{
                __html: htmlCodeForUserName(username, dark, removeLink),
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
        <div className="flex space-x-6">
          <div className="flex space-x-2 items-center">
            <input
              id="dark"
              type="checkbox"
              checked={dark}
              onChange={(e) => setDark(e.target.checked)}
            />
            <label htmlFor="dark">Dark mode</label>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              id="removeLink"
              type="checkbox"
              checked={removeLink}
              onChange={(e) => setRemoveLink(e.target.checked)}
            />
            <label htmlFor="removeLink">
              Remove <strong>crd.so</strong> link
            </label>
          </div>
        </div>
        <a
          href={imageUrlForUsername(username, dark, removeLink)}
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
            value={imageUrlForUsername(username, dark, removeLink)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="htmlCode">Embed HTML code:</label>
          <CopyInput
            id="htmlCode"
            readOnly
            value={htmlCodeForUserName(username, dark, removeLink)}
          />
        </div>
        <div className="flex flex-col space-y-1 items-stretch">
          <label htmlFor="markdownCode">Embed Markdown code:</label>
          <CopyInput
            id="markdownCode"
            readOnly
            value={markdownCodeForUserName(username, dark, removeLink)}
          />
        </div>
      </div>
    </>
  )
}

function imageUrlForUsername(
  username: string,
  dark: boolean,
  removeLink: boolean
) {
  const params = [dark && 'dark', removeLink && 'removeLink'].filter(Boolean)
  return `${process.env.NEXT_PUBLIC_BASE_URL}/i/${encodeURIComponent(
    username
  )}${params.length > 0 ? `?${params.join('&')}` : ''}`
}

function imageAltForUsername(username: string) {
  return `${username}’s GitHub image`
}

function htmlCodeForUserName(
  username: string,
  dark: boolean,
  removeLink: boolean
) {
  const imageUrl = imageUrlForUsername(username, dark, removeLink)
  const imageAlt = imageAltForUsername(username)
  return `<a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" alt="${imageAlt}" width="600" height="314" />`
}

function markdownCodeForUserName(
  username: string,
  dark: boolean,
  removeLink: boolean
) {
  const imageUrl = imageUrlForUsername(username, dark, removeLink)
  const imageAlt = imageAltForUsername(username)
  return `![${imageAlt}](${imageUrl})`
}

function useUsername(): [
  string,
  (username: string, updateUrl?: boolean) => void
] {
  const router = useRouter()
  const pathname = usePathname()!
  const searchParams = useSearchParams()!

  const pathUser = pathname.replace(/^\//, '')
  const searchUser = searchParams.get('user')

  const [user, setUser] = useState(pathUser || searchUser || '')

  const setUsername = useCallback(
    (username: string, updateUrl = true) => {
      if (updateUrl) {
        router.replace(`/${username}`)
        document.title = pageTitle(username)
      }
      setUser(username)
    },
    [router]
  )

  useEffect(() => {
    if (searchUser && searchUser !== pathUser) {
      setUsername(searchUser)
    }
  }, [pathUser, searchUser, setUsername])

  return [user, setUsername]
}

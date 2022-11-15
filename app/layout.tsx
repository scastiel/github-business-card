import Link from 'next/link'
import { PropsWithChildren } from 'react'
import '../styles/globals.css'
import { SeoHeaders } from './seo-headers'

const RootLayout = async ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width" />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          ></script>
        )}
      </head>
      <body>
        <header className="bg-slate-800 text-white p-2">
          <h1>
            <Link href="/" className="flex space-x-3 items-baseline">
              <span className="text-slate-200 font-mono text-lg">crd.so</span>
              <span className="text-slate-400 italic text-sm sm:text-base">
                Create your GitHub Business Card
              </span>
            </Link>
          </h1>
        </header>
        <main className="mb-16">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout

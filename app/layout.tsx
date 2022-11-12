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
        <SeoHeaders
          title="GitHub Business Card"
          description="Generate your custom image from your GitHub username. A fun experiment of image generation."
          author="Sebastien Castiel"
          twitterAuthor="scastiel"
          twitterSite="scastiel"
          url={process.env.NEXT_PUBLIC_BASE_URL}
          imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/api/github?username=michael-scott-12`}
        />
      </head>
      <body>
        <header className="bg-slate-800 text-white p-2 text-lg">
          <h1>
            <Link href="/">GitHub Business Card</Link>
          </h1>
        </header>
        <main className="mb-16">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout

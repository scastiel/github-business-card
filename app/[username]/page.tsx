import { ExternalLink } from './external-link'
import Generator from './generator'

export default function UserPage() {
  return (
    <div className="flex flex-col items-center max-w-screen-sm mx-auto space-y-6 pt-8">
      <Generator />

      <div className="p-2 prose self-stretch">
        <h2>About</h2>
        <p>
          I’m{' '}
          <ExternalLink href="https://scastiel.dev">
            Sebastien Castiel
          </ExternalLink>{' '}
          and I built this project for fun, to play with{' '}
          <ExternalLink href="https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation">
            Vercel’s image generation library
          </ExternalLink>
          . Its source code is{' '}
          <ExternalLink href="https://github.com/scastiel/github-business-card">
            available on GitHub
          </ExternalLink>
          .
        </p>
        <p>
          Curious how to generate images? I wrote{' '}
          <ExternalLink href="https://scastiel.dev/create-og-images-for-your-blog-with-nextjs">
            a short tutorial for you!
          </ExternalLink>
        </p>
        <p>
          And if you’re interested in Next.js, also{' '}
          <ExternalLink href="https://scastiel.gumroad.com/l/serverless-apps-react-nextjs">
            check out the book I wrote about it
          </ExternalLink>
          .
        </p>
      </div>
    </div>
  )
}

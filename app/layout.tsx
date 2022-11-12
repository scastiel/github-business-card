import { PropsWithChildren } from 'react'
import '../styles/globals.css'

const RootLayout = async ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <title>GitHub Image</title>
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <header className="bg-slate-800 text-white p-2 text-lg">
          <h1>Your GitHub business card</h1>
        </header>
        <main className="mb-16">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout

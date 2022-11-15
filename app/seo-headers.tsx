interface Props {
  username?: string
}

export function SeoHeaders({ username }: Props) {
  const title = pageTitle(username)
  const description =
    'Generate your custom image from your GitHub username. A fun experiment of image generation.'
  const author = 'Sebastien Castiel'
  const twitterAuthor = 'scastiel'
  const twitterSite = 'scastiel'
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/github?username=${
    username || 'michael-scott-12'
  }&noBorder`
  return (
    <>
      <title>{title}</title>
      {url && <link rel="canonical" href={url} />}
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:author" content={twitterAuthor} />
      <meta name="twitter:site" content={twitterSite} />
      {url && <meta name="twitter:url" content={url} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:description" content={description} />
    </>
  )
}

export function pageTitle(username: any): string {
  return `${username ? `${username} · ` : ''}GitHub Business Card`
}

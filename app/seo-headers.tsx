interface Props {
  title: string
  description: string
  author: string
  twitterAuthor: string
  twitterSite: string
  url?: string
  imageUrl: string
}

export function SeoHeaders({
  title,
  description,
  author,
  twitterAuthor,
  twitterSite,
  url,
  imageUrl,
}: Props) {
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

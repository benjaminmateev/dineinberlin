import Head from 'next/head'

export default ({ children }) => {
  const title = 'Dine In Berlin'
  const site_url = 'https://dineinberlin.com'
  const description =
    "Your local food joints are struggling during the current crisis — but they're still cooking! Help them keep the lights on, by getting take-out from the best restaurants in Berlin."
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="https://dineinberlin.com/favicon.png" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={site_url} />
      <meta property="og:image" content="https://dineinberlin.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://dineinberlin.com/og-image.png" />
      {children}
    </Head>
  )
}

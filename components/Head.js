import Head from 'next/head'

export default ({ children }) => {
  const title = 'Dine In Berlin'
  const site_url = 'https://dineinberlin.com'
  const fb_app_id = "571317996836972"
  const author = "Benjamin Mateev"
  const description =
    "Your local food joints are struggling during the current crisis — but they're still cooking! Help them keep the lights on, by getting take-out from the best restaurants in Berlin."
  return (
    <Head>
      <meta charset='utf-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='/apple-icon.png'></link>
      <meta name='theme-color' content='#ff8ba7' />
      
      <link rel="icon" href="https://dineinberlin.com/favicon.png" />
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta property="fb:app_id" content={fb_app_id} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={site_url} />
      <meta name="image" property="og:image" content="https://dineinberlin.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://dineinberlin.com/og-image.png" />
      {children}
    </Head>
  )
}

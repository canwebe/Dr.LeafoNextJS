import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='author' content='Golam Rabbani' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='canonical' href='https://drleafo.vercel.app' />

          <link rel='apple-touch-icon' href='/logo192.png' />
          {/* <link rel='manifest' href='/manifest.json' /> */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

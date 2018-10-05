import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="//at.alicdn.com/t/font_859389_j1n7ks6ymu.css"></link>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
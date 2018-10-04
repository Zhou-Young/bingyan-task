// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
// import io from 'socket.io-client'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  // componentDidMount() {
  //   this.socket = io()
  //   // this.socket.on('message', this.handleMessage)
  // }

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
          {/* <script  src = "/socket.io/socket.io.js" ></script> 
          <script>
            var socket = io（）;
          </script> */}
        </body>
      </html>
    )
  }
}
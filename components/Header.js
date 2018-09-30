import Link from 'next/link'
import Head from 'next/head'

import "./Header.scss"

const Header = () => (
    <div class="Header">
      <Head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
        <link rel="stylesheet" href="//at.alicdn.com/t/font_859389_ehf1aab9jqf.css"></link>
      </Head>

      <Link href="/">
        <i className="iconfont icon-homes"/>
      </Link>
      <Link href="/search/search">
        <i className="iconfont icon-search"/>
      </Link>
      <Link href="/chat/chat">
        <i className="iconfont icon-chat"/>
      </Link>
      <Link href="/mine/mine">
        <i className="iconfont icon-mine"/>
      </Link>
    </div>
)

export default Header
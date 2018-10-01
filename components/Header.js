import Link from 'next/link'
import Head from 'next/head'

import "./Header.scss"



const Header = (props) => {
  const {index}=props;
  return (
    <div class="Header">
      <Head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
        <link rel="stylesheet" href="//at.alicdn.com/t/font_859389_j1n7ks6ymu.css"></link>
      </Head>

      <Link href="/">
        <i className={`iconfont icon-home ${index=="0"?"active":""}`}/>
      </Link>
      <Link href="/search/Search">
        <i className={`iconfont icon-search ${index=="1"?"active":""}`}/>
      </Link>
      <Link href="/chat/Chat">
        <i className={`iconfont icon-chat ${index=="2"?"active":""}`}/>
      </Link>
      <Link href="/mine/Mine">
        <i className={`iconfont icon-mine ${index=="3"?"active":""}`}/>
      </Link>
    </div>
)
  }

export default Header
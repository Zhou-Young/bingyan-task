import Link from 'next/link'

import "./Header.scss"


const Header = (props) => {
  const {index}=props;
  return (
    <div className="Header">
      <Link as="/home"  prefetch href="/home/home" passHref>
        <i className={`iconfont icon-home ${index=="0"?"active":""}`}/>
      </Link>
      <Link as="search"  prefetch href="/search/Search" passHref>
        <i className={`iconfont icon-search ${index=="1"?"active":""}`}/>
      </Link>
      <Link as="chat"  prefetch href="/chat/Chat" passHref>
        <i className={`iconfont icon-chat ${index=="2"?"active":""}`}/>
      </Link>
      <Link as="mine"  prefetch href="/mine/Mine" passHref>
        <i className={`iconfont icon-mine ${index=="3"?"active":""}`}/>
      </Link>
    </div>
)
  }

export default Header
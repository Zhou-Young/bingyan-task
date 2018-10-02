import Link from 'next/link'

import "./Header.scss"


const Header = (props) => {
  const {index}=props;
  return (
    <div className="Header">
      <Link href="/home/home">
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
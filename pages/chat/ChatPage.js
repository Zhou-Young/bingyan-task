import React from 'react'
import Link from 'next/link'

import "./ChatPage.scss"

export default class extends React.Component {

  render() {
    return (
      <div className="ChatPage">
        <header>
          <Link href={`/chat/Chat`}>
            <span> &lt; </span>
          </Link>
          <span>CS</span>
        </header>
        <div className="usr-head">
          <img src={default_img}></img>
          <p>CS</p>
        </div>
        <div className="bottom-input">
          <div className="tools">
            <i className="iconfont icon-gif"/>
            <i className="iconfont icon-photo"/>
            <i className="iconfont icon-fontsize"/>
          </div>
          <input type="text" placeholder="say your things"></input>
        </div>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

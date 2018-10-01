import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import "./ChatPage.scss"

export default class extends React.Component {

  render() {
    return (
      <div className="ChatPage">
        <Head>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
          <link rel="stylesheet" href="//at.alicdn.com/t/font_859389_j1n7ks6ymu.css"></link>
        </Head>
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

import React from 'react'
import Head from 'next/head'

import "./Edit.scss"
import Link from 'next/link'

export default class extends React.Component {

  render() {
    return (
      <div className="Edit">
        <Head>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
          <link rel="stylesheet" href="//at.alicdn.com/t/font_859389_j1n7ks6ymu.css"></link>
        </Head>
        <header>
          <Link href="/">
            <span> &lt; </span>
          </Link>
          <span>new Post</span>
        </header>
        <div className="usr-head">
          <img src={default_img}></img>
          <p>zhouY</p>
        </div>
        <div class="edit-wrap">
          <input type="text" placeholder="title" className="title"></input>
          <textarea placeholder="contents" className="contents"/>>
          <div className="tools">
            <i className="iconfont icon-gif"/>
            <i className="iconfont icon-photo"/>
            <i className="iconfont icon-fontsize"/>
          </div>
        </div>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

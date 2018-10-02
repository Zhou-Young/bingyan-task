import React from 'react'

import "./Edit.scss"
import Link from 'next/link'

export default class extends React.Component {

  render() {
    return (
      <div className="Edit">
        <header>
          <Link href="/home/home">
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
          <textarea placeholder="contents" className="contents"/>
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

import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'

import "./Chat.scss"

export default class extends React.Component {

  render() {
    return (
      <div className="Chat">
        <Layout index="2">
          <div className="chat-start" onClick={this.newPen}>
            <i className="iconfont icon-add"></i>
          </div>
          <header>
            <p>zhouY</p>
            <p>chat</p>
          </header>
          <Link href={`/chat/ChatPage?type=disc`}>
            <div className="chat-item">
              <img src={default_img}></img>
              <div className="item-right">
                <p className="name">name</p>
                <p className="disc">dics</p>
              </div>
            </div>
          </Link>
        </Layout>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import {user_info} from '../data'

import "./Chat.scss"

export default class extends React.Component {

  render() {
    // const {user_info}=this.props;
    console.log(user_info);
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
          {/* {
            user_info.map(v => {
              return(
                <Link href={`/chat/ChatPage?type=desc`}>
                  <div className="chat-item">
                    <img src={default_img}></img>
                    <div className="item-right">
                      <p className="name">{v.name}</p>
                      <p className="disc">{v.decs}</p>
                    </div>
                  </div>
                </Link>
              )
              
            })
          } */}
          
          
        </Layout>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

import React from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import fetch from 'isomorphic-unfetch'

import "./ChatPage.scss"

export default class extends React.Component {
  static async getInitialProps({req}) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const res = await fetch(baseUrl+`/user/getUserInfo`)
    const show = await res.json();
    const user = show.data;
    return { user }
  }

  sendMessage() {
    // e.preventDefault();
    // e.stopPropagation();  message
    
    const message = this.refs.message.value;
    console.log(message)
    this.socket = io();
    this.socket.on('news', (data)=> {
      console.log(data);
      this.socket.emit('my other event', { my: 'data' });
    });
  }

  componentDidMount() {
    const {url:{query}} = this.props;
    console.log('props',this.props,query);

    // this.socket = io('/chat/ChatPage')
    // this.socket = io();
    // this.socket.on('message', this.handleMessage)
    // var socket = io.connect('/chat/ChatPage');
    
  }

  render() {
    const {url:{query}} = this.props;
    return (
      <div className="ChatPage">
        <header>
          <Link href={`/chat/Chat`}>
            <span> &lt; </span>
          </Link>
          <span>{query.name}</span>
        </header>
        <div className="usr-head">
          <img src={query.userImg || default_img}></img>
          <p>{query.name}</p>
        </div>
        <div className="bottom-input">
          <div className="tools">
            <i className="iconfont icon-gif"/>
            <i className="iconfont icon-photo"/>
            <i className="iconfont icon-fontsize"/>
          </div>
          <input type="text" placeholder="say your things" ref="message"></input>
          <span className="send" onClick={()=>this.sendMessage()}>send</span>
        </div>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

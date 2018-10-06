import React from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import axios from 'axios';

import "./ChatPage.scss"

export default class extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      chatMessage: [],
      cbData: ''
    };
    this.user = {};
  }

  sendMessage() {
    const {url:{query:{name}}} = this.props;
    const message = this.refs.message.value;
    this.state.chatMessage.push({
      userImg: this.user.userImg,
      me: this.user.name,
      message: message,
    });
    this.setState({
      chatMessage: this.state.chatMessage
    })
    // this.socket.emit('client-chat', { data: message, other: name, me: this.user.name });

    this.refs.message.value = "";

    axios({
      method: 'POST',
      url: '/chat/sendChat',
      data: {
        message: message, 
        other: name, 
        me: this.user.name
      }
    }).then(()=>{
        this.socket.emit('client-chat', { data: message, other: name, me: this.user.name });
    })
  }

  componentDidMount() {
    const {url:{query}} = this.props;
    axios({
      method: 'GET',
      url: `/user/getUserInfo`,
    }).then(({data}) => {
      if(data.success){
        this.user = {
          name: data.data.name,
          desc: data.data.desc,
          userImg: data.data.userImg
        };
      }else{
        alert(data.message);
        if(data.data == 12321){
          Router.push('/');
        }
      }
    })
    .then(()=>{
      axios({
        method: 'GET',
        url: '/chat/getChatHistory',
        params: {
          other: query.name, 
          me: this.user.name
        }
      }).then(({data})=>{
        if(!!data.data) {

        }
        this.setState({
          chatMessage: data.data
        })
      })
      this.socket = io();
       this.socket.on(this.user.name, (data)=> {
        this.state.chatMessage.push({
          userImg: query.userImg,
          me: query.name,
          message: data.data,
        });
        this.setState({
          chatMessage: this.state.chatMessage
        })
      });
    })
    

    
  }

  render() {
    const {url:{query}} = this.props;
    const {chatMessage} = this.state;
    return (
      <div className="ChatPage">
        <header>
          <Link as="/chat" href={`/chat/Chat`}>
            <span> &lt; </span>
          </Link>
          <span>{query.name}</span>
        </header>
        <div className="chat-center">
          <div className="usr-head">
            <img src={query.userImg || default_img}></img>
            <p>{query.name}</p>
          </div>
          <div className="chat-wrap">
          {
            chatMessage && chatMessage.map((v,i)=>{
              return <div className="chat-item" index={i}>
              <img src={v.me == query.name ? query.userImg : this.user.userImg || default_img} className="item-img left"/>
              <div className="chat-box">
                <p className="item-name">{v.me}</p>
                <p className="item-content">{v.message}</p>
              </div>
            </div>
            })
          }
          </div>
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

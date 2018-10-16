import React from 'react';
import Link from 'next/link';
import io from 'socket.io-client';
// import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import axios from 'axios';

import './ChatPage.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: []
    };
    this.user = {};
    this.message = React.createRef();
  }

  componentDidMount() {
    const {
      url: { query }
    } = this.props;
    axios({
      method: 'GET',
      url: `/user/getUserInfo`
    })
      .then(({ data }) => {
        if (data.success) {
          this.user = {
            name: data.data.name,
            desc: data.data.desc,
            userImg: data.data.userImg
          };
        } else {
          alert(data.message);
          if (data.data === 12321) {
            Router.push('/');
          }
        }
      })
      .then(() => {
        axios({
          method: 'GET',
          url: '/chat/getChatHistory',
          params: {
            other: query.name,
            me: this.user.name
          }
        }).then(({ data }) => {
          this.setState({
            chatMessage: data.data
          });
        });
        this.socket = io();
        this.socket.on(this.user.name, data => {
          this.setState(prevState => ({
            chatMessage: prevState.chatMessage.push({
              userImg: query.userImg,
              me: query.name,
              message: data.data
            })
          }));
        });
      });
  }

  sendMessage() {
    const {
      url: {
        query: { name }
      }
    } = this.props;
    this.setState(prevState => ({
      chatMessage: prevState.chatMessage.push({
        userImg: this.user.userImg,
        me: this.user.name,
        message: this.message.current.value
      })
    }));

    // this.socket.emit('client-chat', { data: message, other: name, me: this.user.name });

    this.message.current.value = '';

    axios({
      method: 'POST',
      url: '/chat/sendChat',
      data: {
        message: this.message.current.value,
        other: name,
        me: this.user.name
      }
    }).then(() => {
      this.socket.emit('client-chat', {
        data: this.message.current.value,
        other: name,
        me: this.user.name
      });
    });
  }

  render() {
    const {
      url: { query }
    } = this.props;
    const DEFAULT_IMG = '/static/images/default-img.png';
    const { chatMessage } = this.state;
    return (
      <div className="ChatPage">
        <header>
          <Link as="/chat" href="/chat/Chat">
            <span> &lt; </span>
          </Link>
          <span>{query.name}</span>
        </header>
        <div className="chat-center">
          <div className="usr-head">
            <img src={query.userImg || DEFAULT_IMG} alt="user img" />
            <p>{query.name}</p>
          </div>
          <div className="chat-wrap">
            {chatMessage &&
              chatMessage.map((v, i) => (
                <div className="chat-item" key={i}>
                  <img
                    src={v.me === query.name ? query.userImg : this.user.userImg || DEFAULT_IMG}
                    className="item-img left"
                    alt="user img"
                  />
                  <div className="chat-box">
                    <p className="item-name">{v.me}</p>
                    <p className="item-content">{v.message}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bottom-input">
          <div className="tools">
            <i className="iconfont icon-gif" />
            <i className="iconfont icon-photo" />
            <i className="iconfont icon-fontsize" />
          </div>
          <input type="text" placeholder="say your things" ref={this.message} />
          <span className="send" onClick={() => this.sendMessage()}>
            send
          </span>
        </div>
      </div>
    );
  }
}

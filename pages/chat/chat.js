import React from 'react';
import Link from 'next/link';
import axios from 'axios';
// import fetch from 'isomorphic-unfetch'
import Router from 'next/router';
import Layout from '../../components/MyLayout';
import './chat.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userList: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios({
      method: 'GET',
      url: '/user/getUserInfo'
    }).then(({ data }) => {
      if (data.success) {
        this.setState({
          user: {
            name: data.data.name,
            desc: data.data.desc,
            userImg: data.data.userImg
          }
        });
      } else {
        alert(data.message);
        if (data.data === 12321) {
          Router.push('/');
        }
      }
    });
    axios({
      method: 'GET',
      url: '/user/getUserList'
    }).then(({ data }) => {
      if (data.success) {
        this.setState({
          userList: data.data,
          loading: false
        });
      } else {
        alert(data.message);
      }
    });
  }

  render() {
    const { userList, user, loading } = this.state;
    const load = <p className="tips">loading...</p>;
    const noUser = <p className="tips">no user ~</p>;
    const DEFAULT_IMG = '/static/images/default-img.png';
    return (
      <div className="Chat">
        <Layout index="2">
          <Link href="/chat/ChatList">
            <div className="chat-start" onClick={this.newPen}>
              <i className="iconfont icon-add" />
            </div>
          </Link>
          <header>
            <p>{user.name}</p>
            <p>chat</p>
          </header>
          <div className="user-list">
            {loading && load}
            {!loading &&
              (userList
                ? userList.map((v, i) => (
                    <Link
                      href={`/chat/ChatPage?name=${v.name}&desc=${v.desc}&userImg=${v.userImg}`}
                      key={i}
                    >
                      <div className="chat-item clearfix">
                        <img src={v.userImg || DEFAULT_IMG} alt="default img" />
                        <div className="item-right">
                          <p className="name">{v.name}</p>
                          <p className="disc">{v.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                : noUser)}
          </div>
        </Layout>
      </div>
    );
  }
}

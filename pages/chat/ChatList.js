import React from 'react';
import Link from 'next/link';
import axios from 'axios';
// import Router from 'next/router';

import './ChatList.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: '/user/getUserList'
    }).then(({ data }) => {
      if (data.success) {
        this.setState({
          userList: data.data
        });
      } else {
        alert(data.message);
      }
    });
  }

  render() {
    const { userList } = this.state;
    const noUser = <p className="tips">no user ~</p>;
    const DEFAULT_IMG = '/static/images/default-img.png';
    return (
      <div className="ChatList">
        <header>
          <span> back </span>
          <span>group</span>
        </header>
        <div className="user-list">
          {userList
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
            : noUser}
        </div>
        <footer>sure</footer>
      </div>
    );
  }
}

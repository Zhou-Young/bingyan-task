import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
// import fetch from 'isomorphic-unfetch'
import axios from 'axios';

import './Edit.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      noClick: false
    };
    this.noClick = false;
    this.title = React.createRef();
    this.content = React.createRef();
  }

  componentDidMount() {
    axios({
      type: 'GET',
      url: `/user/getUserInfo`
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
  }

  publish() {
    const {
      user: { name, userImg }
    } = this.state;
    if (this.noClick) {
      return alert('Do not repeat clicks');
    }
    this.noClick = true;
    axios({
      method: 'POST',
      url: `/home/publishDynamic`,
      data: {
        title: this.title.current.value,
        content: this.content.current.value,
        name,
        userImg
      }
    }).then(({ data }) => {
      if (data.success) {
        Router.push('/home/home', '/home');
      } else {
        alert(data.message);
      }
    });
  }

  render() {
    const { user } = this.state;
    const DEFAULT_IMG = '/static/images/default-img.png';
    return (
      <div className="Edit">
        <header>
          <Link as="/home" href="/home/home">
            <span> &lt; </span>
          </Link>
          <span>new Post</span>
          <span className="publish" onClick={() => this.publish()}>
            publish
          </span>
        </header>
        <div className="usr-head">
          <img src={user.userImg || DEFAULT_IMG} alt="default img" />
          <p>{user.name}</p>
        </div>
        <div className="edit-wrap">
          <input type="text" placeholder="title" className="title" ref={this.title} />
          <textarea placeholder="contents" className="contents" ref={this.content} />
          <div className="tools">
            <i className="iconfont icon-gif" />
            <i className="iconfont icon-photo" />
            <i className="iconfont icon-fontsize" />
          </div>
        </div>
      </div>
    );
  }
}

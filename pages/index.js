import React from 'react';
import Router from 'next/router';
// import fetch from 'isomorphic-unfetch';
import axios from 'axios';
// import io from 'socket.io-client';

import './index.scss';

export default class extends React.Component {
  //   static async getInitialProps() {
  //   const res = await fetch(`http://127.0.0.1:27017/bingyan-task/account`)
  //   const show = await res.json()
  //   return { show }
  // }
  constructor(props) {
    super(props);
    this.signName = React.createRef();
    this.signPsw = React.createRef();
  }

  componentDidMount() {}

  signIn() {
    const signName = this.signName.current.value;
    const signPsw = this.signPsw.current.value;
    if (!signName || !signPsw) {
      alert('please input name or password');
    } else {
      axios({
        method: 'POST',
        url: '/user/signin',
        data: {
          name: signName,
          password: signPsw
        }
      })
        .then(response => {
          if (response.data.success) {
            Router.push('/home/home', '/home');
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  render() {
    return (
      <div>
        <div className="wrap">
          <input type="text" className="text" placeholder="name" name="text" ref={this.signName} />
          <input
            type="password"
            className="password"
            placeholder="password"
            name="password"
            ref={this.signPsw}
          />
          <div className="sign" onClick={() => this.signIn()}>
            Sign in
          </div>
        </div>
      </div>
    );
  }
}

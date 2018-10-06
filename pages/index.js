import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import axios from 'axios';
import io from 'socket.io-client'

import "./index.scss"

export default class extends React.Component {
  //   static async getInitialProps() {
  //   const res = await fetch(`http://127.0.0.1:27017/bingyan-task/account`)
  //   const show = await res.json()
  //   return { show }
  // }
  constructor(props) {
    super(props);
  }

  userValid() {
    
  }

  signIn() {
    const name = this.refs.name.value;
    const password = this.refs.password.value;
    if (!name || !password) {
      alert('please input name or password');
    }else{
      axios({
        method: 'POST',
        url: `/user/signin`,
        data: {
          name: name,
          password: password
        }
      }).then(function (response) {
        if(response.data.success) {
          Router.push('/home/home','/home');
        }else {
          alert(response.data.message);
        }
        
      })
      .catch(function (error) {
        alert(error.message);
      });
      
    }
    

  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <div className="wrap">
          <input type="text" className="text" placeholder="name" name="text" ref="name"></input>
          <input type="password" className="password" placeholder="password" name="password" ref="password"/>
          <div className="sign" onClick={()=>this.signIn()}>Sign in</div>
        </div>
      </div>
    )
  }
}

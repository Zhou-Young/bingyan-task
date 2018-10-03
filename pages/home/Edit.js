import React from 'react'

import "./Edit.scss"
import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import $ from 'jquery';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  publish() {
    const title = this.refs.title.value;
    const content = this.refs.content.value;
    console.log(title,content);
///home/publishDynamic
    $.ajax({
      type: 'POST',
      "url": `/home/publishDynamic`,
      data: {
        title: title,
        content: content,
        name: this.state.user.name,
        userImg: this.state.user.userImg,
      }
    }).then((result) => {
      if(result.success){
        Router.push('/home/home');
      }else{
        alert(result.message);
      }
    })
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      "url": `/user/getUserInfo`,
    }).then((result) => {
      if(result.success){
        const data = result.data;
        this.setState({
          user: {
            name: data.name,
            desc: data.desc,
            userImg: data.userImg
          }
        })
      }else{
        alert(result.message);
        if(result.data == 12321){
          Router.push('/');
        }
      }
    })

  }

  render() {
    const {user}=this.state;
    return (
      <div className="Edit">
        <header>
          <Link href="/home/home">
            <span> &lt; </span>
          </Link>
          <span>new Post</span>
          <span class="publish" onClick={()=>this.publish()}>publish</span>
        </header>
        <div className="usr-head">
          <img src={user.userImg || default_img}></img>
          <p>{user.name}</p>
        </div>
        <div className="edit-wrap">
          <input type="text" placeholder="title" className="title" ref="title"></input>
          <textarea placeholder="contents" className="contents" ref="content"/>
          <div className="tools">
            <i className="iconfont icon-gif"/>
            <i className="iconfont icon-photo"/>
            <i className="iconfont icon-fontsize"/>
          </div>
        </div>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

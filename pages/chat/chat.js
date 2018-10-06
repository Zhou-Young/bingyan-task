import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import axios from 'axios';
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import "./Chat.scss"

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    axios({
      method: 'GET',
      url: `/user/getUserInfo`,
    }).then(({data}) => {
      if(data.success){
        this.setState({
          user: {
            name: data.data.name,
            desc: data.data.desc,
            userImg: data.data.userImg
          }
        })
      }
      else{
        alert(data.message);
        if(data.data == 12321){
          Router.push('/');
        }
      }
    })
    axios({
      method: 'GET',
      url: `/user/getUserList`,
    }).then(({data}) => {
      if(data.success){
        this.setState({
          userList: data.data,
          loading: false
        })
      }else{
        alert(data.message);
      }
    })
  }


  render() {
    const {userList, user, loading}=this.state;
    const load = <p className="tips">loading...</p>
    const noUser = <p className="tips">no user ~</p>
    return (
      <div className="Chat">
        <Layout index="2">
          <div className="chat-start" onClick={this.newPen}>
            <i className="iconfont icon-add"></i>
          </div>
          <header>
            <p>{user.name}</p>
            <p>chat</p>
          </header>
          <div className="user-list">
          {
            loading ? load:  userList ? userList.map(v => {
              return(
                <Link href={`/chat/ChatPage?name=${v.name}&desc=${v.desc}&userImg=${v.userImg}`}>
                  <div className="chat-item">
                    <img src={v.userImg || default_img}></img>
                    <div className="item-right">
                      <p className="name">{v.name}</p>
                      <p className="disc">{v.desc}</p>
                    </div>
                  </div>
                </Link>
              )
              
            }) : noUser
          }
          </div>
       
          
          
        </Layout>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

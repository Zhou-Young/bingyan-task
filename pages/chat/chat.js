import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
// import {user_info} from '../data'
import axios from 'axios';
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import "./Chat.scss"

export default class extends React.Component {
  // static async getInitialProps({req}) {
  //   const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  //   const userlist = await fetch(baseUrl+`/user/getUserList`)
  //   const userListShow = await userlist.json();
  //   const userList = userListShow.data;
  //   const res = await fetch(baseUrl+`/user/getUserInfo`)
  //   const show = await res.json();
  //   const userInfo = show.data;
  //   console.log(res,userlist);
  //   return { userList , userInfo}
  // }
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userList: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: `/user/getUserInfo`,
    }).then((result) => {
      console.log(result);
      if(result.data.success){
        const data = result.data.data;
        this.setState({
          user: {
            name: data.name,
            desc: data.desc,
            userImg: data.userImg
          }
        })
      }
      else{
        alert(result.data.message);
        if(result.data.data == 12321){
          Router.push('/');
        }
      }
    })
    axios({
      method: 'GET',
      url: `/user/getUserList`,
    }).then((result) => {
      if(result.data.success){
        const data = result.data.data;
        this.setState({
          userList: data
        })
      }else{
        alert(result.data.message);
      }
    })
  }


  render() {
    const {userList, user}=this.state;
    // console.log(userList, user);
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
          {
            userList.map(v => {
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
              
            })
          }
          
          
        </Layout>
      </div>
      
    )
  }
}

const default_img = "/static/images/default-img.png";

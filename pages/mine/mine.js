import React from 'react'
import Layout from '../../components/MyLayout.js'
import Dynamic from '../../components/Dynamic.js'
// import $ from 'jquery';
import axios from 'axios';
// import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

import "./Mine.scss"

export default class extends React.Component {
  // static async getInitialProps({req}) {
  //   const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  //   const res = await fetch(baseUrl+`/user/getUserInfo`)
  //   const show = await res.json();
  //   const user = show.data;
  //   return { user }
  // }

  constructor(props) {
    super(props);
    this.state = {
      nav_index: 0,
      user: {},
      dynamicList: [],
      setting: false,
    };
  }

  

  deleteContent() {

  }

  changeNavIndex(index) {
    this.setState({
      nav_index:index
    })
  }

  setLog() {
    this.setState({
      setting: !this.state.setting
    })
  }

  logOut() {
    axios({
      methos: 'GET',
      url: `/user/logout`,
    }).then((result) => {
      if(result.data.success){
        Router.push('/');
      }else{
        alert(result.data.message);
      }
    })
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
      }else{
        alert(result.data.message);
        if(result.data.data == 12321){
          Router.push('/');
        }
      }
    })
    
    axios({
      method: 'GET',
      url: `/home/getMyDynamicList`,
    }).then((result) => {
      if(result.data.success){
        const data = result.data.data;
        this.setState({
          dynamicList: data
        })
      }else{
        alert(result.data.message);
      }
    })

  }

  

  render() {
    const {nav_index, user, dynamicList, setting}=this.state;
    // const {user} = this.props;
    console.log("user",dynamicList);
    return (
      <div className="Mine">
        <Layout index="3">
          <div className="head">
            <div className="head-top">
              <span className="name">{user.name}</span>
              <i className="iconfont icon-set" onClick={()=>this.setLog()}></i>
              <i className="iconfont icon-paint"/>
              <i className="iconfont icon-search"/>
              {setting && <p className="logout" onClick={this.logOut}>log out</p>}
              
            </div>
            <img src={default_bg}/>
          </div>
          <div className="user-info">
            <img src={user.userImg || default_img}/>
            <h1>{user.desc}</h1>
          </div>
          <ul className="nav clearfix">
            <li className={`posts ${nav_index==0 ? "active" : ""}`} onClick={()=>this.changeNavIndex(0)}>posts</li>
            <li className={`likes ${nav_index==1 ? "active" : ""}`} onClick={()=>this.changeNavIndex(1)}>likes</li>
            <li className={`follow  ${nav_index==2 ? "active" : ""}`} onClick={()=>this.changeNavIndex(2)}>following</li>
          </ul>
          <div className="m-content">
          <div className="tips">
            <span >everyone can see this</span>
            <span className="change">change</span>
          </div>
          
            {
              nav_index == 0 && 
              dynamicList.map((v, i)=>{return <Dynamic type="me" dynamic={v} index={i}/>})
            }
            {/* {
              nav_index == 1 && <Dynamic/>
            } */}
            {
              nav_index == 2 && <div className="follow-content">
                <img src={default_img} alt="default image" className="dy-pic"></img>
                <span className="author">作者</span>
                <i className="iconfont icon-close"></i>
              </div>
            }
          
          </div>

          
        </Layout>

      </div>

    )
  }
}

const default_img = "/static/images/default-img.png";
const default_bg = "/static/images/default-bg.jpg";

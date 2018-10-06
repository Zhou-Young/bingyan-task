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
      dynamicList2: [],
      followList: [],
      setting: false,
    };
  }

  changeNavIndex(index) {
    this.setState({
      nav_index:index
    })
    // if(index == 1) {

    // }
  }

  setLog() {
    this.setState({
      setting: !this.state.setting
    })
  }

  logOut() {
    axios({
      method: 'GET',
      url: `/user/logout`,
    }).then(({data}) => {
      if(data.success){
        Router.push('/');
      }else{
        alert(data.message);
      }
    })
  }

  deleteDynamic(id) {
    axios({
      method: 'POST',
      url: `/home/deleteDynamic`,
      data: {
        _id: id,
      }
    }).then(({data}) => {
      if(data.success){
        alert("delete success");
        this.fetchData1();
      }else{
        alert(data.message);
      }
    })
  }

  fetchData1() {
    axios({
      method: 'GET',
      url: `/home/getMyDynamicList`,
    }).then(({data}) => {
      if(data.success){
        this.setState({
          dynamicList: data.data
        })
      }else{
        alert(data.message);
      }
    })
  }
  fetchData2() {
    axios({
      method: 'GET',
      url: `/user/getLikes`,
    }).then(({data}) => {
      if(data.success){
        this.setState({
          dynamicList2: data.data
        })
      }else{
        alert(data.message);
      }
    })
  }
  fetchData3() {
    axios({
      method: 'GET',
      url: `/user/getFollows`,
    }).then(({data}) => {
      if(data.success){
        this.setState({
          followList: data.data
        })
      }else{
        alert(data.message);
      }
    })
  }

  addFollows(author) {
    axios({
      method: 'POST',
      url: `/user/addFollows`,
      data: {
        author: author
      }
    }).then(({data}) => {
      if(data.success){
        console.log('success');
        this.fetchData3();
      }else{
        alert(data.message);
      }
    })
  }
  addLikes(id) {
    axios({
      method: 'POST',
      url: `/user/addLikes`,
      data: {
        id: id
      }
    }).then(({data}) => {
      if(data.success){
        console.log('success');
        this.fetchData2();
      }else{
        alert(data.message);
      }
    })
  }

  componentDidMount() {
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
      }else{
        alert(data.message);
        if(data.data == 12321){
          Router.push('/');
        }
      }
    })
    this.fetchData1();
    this.fetchData3();
    this.fetchData2();
  }

  render() {
    const {nav_index, user, dynamicList, dynamicList2, followList, setting}=this.state;
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
              dynamicList && dynamicList.map((v, i)=>{return <Dynamic type="me" deleteDynamic={(id)=>this.deleteDynamic(id)} dynamic={v} index={i}/>})
            }
            {
              nav_index == 1 && dynamicList2 && dynamicList2.map((v, i)=>{return <Dynamic deleteContent={(id)=>this.addLikes(id)} dynamic={v} index={i}/>})
            }
            {
              nav_index == 2 && followList && followList.map((v)=>{
                return <div className="follow-content">
                <img src={v.userImg || default_img} alt="default image" className="dy-pic"></img>
                <span className="author">{v.name}</span>
                <i className="iconfont icon-close" onClick={()=>this.addFollows(v.name)}></i>
              </div>
              })
            }
          
          </div>

          
        </Layout>

      </div>

    )
  }
}

const default_img = "/static/images/default-img.png";
const default_bg = "/static/images/default-bg.jpg";

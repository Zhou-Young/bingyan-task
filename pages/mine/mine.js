import React from 'react'
import Layout from '../../components/MyLayout.js'


import "./mine.scss"

export default class extends React.Component {

  render() {
    return (
      <Layout>
        <div className="head">
          <div className="head-top">
            <span className="name">zhouY</span>
            <i className="iconfont icon-set"/>
            <i className="iconfont icon-paint"/>
            <i className="iconfont icon-search"/>
          </div>
          <img src={default_img}/>
        </div>
        <div className="user-info">
          <img src={default_img}/>
          <h1>wtf???</h1>
        </div>
        <p>mine</p>
      </Layout>
    )
  }
}

const default_img = "/static/images/default-img.png";

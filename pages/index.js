import React from 'react'
import Layout from '../components/MyLayout.js'
import Markdown from 'react-markdown'

import "./style.scss"

export default class extends React.Component {
  // static async getInitialProps() {
  //   const res = await fetch(`http://api.tvmaze.com/shows`)
  // const show = await res.json()
  // return { show }
  // }
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  newPen() {
    console.log('newPen');
  }

  deleteContent(){

  }

  componentDidMount() {
    console.log('ready');
  }

  render() {
    const {date} = this.state;
    
    return (
      <div className="main-page">
      <Layout>
        <div className="pen-start" onClick={this.newPen}>
          <i className="iconfont icon-pen"></i>
        </div>

        <div className="dynamic">
          <header>
            <img src={default_img} alt="default image" className="dy-pic"></img>
            <span className="author">作者</span>
            <span className="follow">follow</span>
            <i onClick={this.deleteContent} className="iconfont icon-close"></i>
          </header>
          <div className="content">
            <img className="dy-img" src={default_img}></img>
            <h3 className="dy-title">这是标题{date.toLocaleTimeString()}</h3>
            <div className="markdown">
              <Markdown source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
              `}/>
            </div>
          </div>
        </div>

       </Layout>

       </div>
    )
  }
}
const default_img = "/static/images/default-img.png";


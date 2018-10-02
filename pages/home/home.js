import React from 'react'
import Layout from '../../components/MyLayout.js'
import Dynamic from '../../components/Dynamic.js'
import Link from 'next/link'
import $ from 'jquery';
import fetch from 'isomorphic-unfetch'

import "./home.scss"

const PostLink = (props) => (

    <Link href={`/home/Edit?type=${props.type}`}>
      <p className={props.className}>{props.type}</p>
    </Link>

)

export default class extends React.Component {
  // static async getInitialProps() {
  //   const res = await fetch(`http://127.0.0.1:27017/bingyan-task/account`)
  //   const show = await res.json()
  //   return { show }
  // }
  constructor(props) {
    super(props);
    this.state = {
      pen : 0
    };
  }

  togglePen() {
    this.setState({
      pen: !this.state.pen
    })
  }



  componentDidMount() {
    console.log('ready');
    $.ajax({
      type: 'get',
      "url": `http://localhost:3000/home/getDynamicList`,
      data: {}
    }).then((result) => {
      if(result.success){
        console.log("yes");
      }else{
        alert(result.message);
      }
    })
  }

  render() {
    const {pen} = this.state;
    const dynamic = {
      author: 'cs',
      content: 'content',
      title: 'title',
    };
    return (
      <div className="main-page">
        <Layout index="0">
          <div className="pen-start" onClick={()=>this.togglePen()}>
            <i className="iconfont icon-pen"></i>
          </div>
          <Dynamic type="other" dynamic={dynamic}/>
        </Layout>
        {
          !!pen &&
          <div className="modle-choose">
            <div className="wrap">
              <PostLink className="pic" id="pic" type="pic"/>
              <PostLink className="gif" id="gif" type="gif"/>
              <PostLink className="words" id="words" type="words"/>
              <PostLink className="voice" id="voice" type="voice"/>
            </div>
            <i className="iconfont icon-close" onClick={()=>this.togglePen()}/>
          
          </div>
        }
          
       </div>
    )
  }
}
const default_img = "/static/images/default-img.png";


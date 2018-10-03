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
  static async getInitialProps({req}) {
    // const app = req.app;
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const res = await fetch(baseUrl+`/home/getDynamicList`)
    const show = await res.json();
    const dynamicList = show.data;
    return { dynamicList }
  }
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
    // $.ajax({
    //   type: 'get',
    //   "url": `/home/getDynamicList`,
    //   data: {}
    // }).then((result) => {
    //   if(result.success){
    //     console.log("yes");
    //     this.dynamicList = result.data;
    //   }else{
    //     alert(result.message);
    //   }
    // })
  }

  render() {
    const {pen} = this.state;

    const {dynamicList} = this.props;
    return (
      <div className="main-page">
        <Layout index="0">
          <div className="pen-start" onClick={()=>this.togglePen()}>
            <i className="iconfont icon-pen"></i>
          </div>
          {
            dynamicList.map(v=>{
              return <Dynamic type="other" dynamic={v}/>
            })
          }
          

          
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


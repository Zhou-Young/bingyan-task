import React from 'react'
import Layout from '../../components/MyLayout.js'
import Dynamic from '../../components/Dynamic.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import "./home.scss"

const PostLink = (props) => (

    <Link href={`/home/Edit?type=${props.type}`}>
      <p className={props.className}>{props.type}</p>
    </Link>

)

export default class extends React.Component {
  static async getInitialProps({req}) {
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
            dynamicList && dynamicList.map((v, i)=>{
              return <Dynamic type="other" dynamic={v} index={i}/>
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


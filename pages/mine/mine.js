import React from 'react'
import Layout from '../../components/MyLayout.js'
import Dynamic from '../../components/Dynamic.js'


import "./Mine.scss"

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_index: 0
    };
  }

  

  deleteContent() {

  }

  changeNavIndex(index) {
    this.setState({
      nav_index:index
    })
    // this.state = index;
  }

  componentDidMount() {
    console.log('ready');
  }
  render() {
    const {nav_index}=this.state;
    return (
      <div className="Mine">
        <Layout index="3">
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
              nav_index == 0 && <Dynamic type="me"/>
            }
            {
              nav_index == 1 && <Dynamic/>
            }
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

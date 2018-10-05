import React from 'react'
import Layout from '../../components/MyLayout.js'
import Dynamic from '../../components/Dynamic.js'
import axios from 'axios';

import "./Search.scss"

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicList: [],
    };
  }

  handler() {
     const keyword = this.refs.keyword.value;
     console.log("search");
     axios({
       method: 'GET',
       url: `/home/getDynamicList`,
       params: {keyword: keyword}
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
    onKeyup (e) {
      e.keyCode === 13 && this.handler()
  }


  render() {
    const {dynamicList}=this.state;
    return (
      <Layout index="1">
        <div className="Search">
          <input type="search" placeholder="search" className="search-box" ref="keyword" onBlur={()=>this.handler()} onKeyUp={(e)=>this.onKeyup(e)}/>
          <div className="tags">
            <p>tags your follows</p>
            <div className="tags-wrap">
              <p className="add">+</p>
                {
                  focus && focus.map( (e) => {
                    return <p style={{backgroundColor:`#${Math.floor(Math.random()*0xffffff).toString(16)}`}}>{e}</p>
                  })
                }
              </div>
          </div>
          {
            dynamicList && dynamicList.map((v, i)=>{return <Dynamic dynamic={v} index={i}/>})
          }

        </div>
      </Layout>
    )
  }
}
const focus = ["movie","music","article"]

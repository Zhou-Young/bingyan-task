import React from 'react'
import Layout from '../../components/MyLayout.js'


import "./Search.scss"

export default class extends React.Component {

  render() {
    return (
      <Layout index="1">
        <div className="Search">
          <input type="search" placeholder="search" className="search-box"></input>
          <div className="tags">
          <p>tags your follows</p>
          <div className="tags-wrap">
          
          <p className="add">+</p>
            {
              focus.map( (e) => {
                return <p style={{backgroundColor:`#${Math.floor(Math.random()*0xffffff).toString(16)}`}}>{e}</p>
              })
            }
          </div>
            
            
          </div>
        </div>
      </Layout>
    )
  }
}
const focus = ["movie","music","article","article","article","article"]

import React from 'react';
import axios from 'axios';
import Layout from '../../components/MyLayout';
import Dynamic from '../../components/Dynamic';

import './search.scss';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicList: []
    };
    this.keyword = React.createRef();
  }

  onKeyup(e) {
    e.keyCode === 13 && this.handler();
  }

  handler() {
    console.log('search');
    axios({
      method: 'GET',
      url: '/home/getDynamicList',
      params: { keyword: this.keyword.current.value }
    }).then(({ data }) => {
      if (data.success) {
        this.setState({
          dynamicList: data.data
        });
      } else {
        alert(data.message);
      }
    });
  }

  render() {
    const { dynamicList } = this.state;
    const focus = ['movie', 'music', 'article'];
    return (
      <Layout index="1">
        <div className="Search">
          <input
            type="search"
            placeholder="search"
            className="search-box"
            ref={this.keyword}
            onBlur={() => this.handler()}
            onKeyUp={e => this.onKeyup(e)}
          />
          <div className="tags">
            <p>tags your follows</p>
            <div className="tags-wrap">
              <p className="add">+</p>
              {focus &&
                focus.map((e, i) => (
                  <p
                    key={i}
                    style={{
                      backgroundColor: `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
                    }}
                  >
                    {e}
                  </p>
                ))}
            </div>
          </div>
          {dynamicList && dynamicList.map((v, i) => <Dynamic dynamic={v} key={i} />)}
        </div>
      </Layout>
    );
  }
}

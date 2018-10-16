import React from 'react';
import Link from 'next/link';
// import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Dynamic from '../../components/Dynamic';
import Layout from '../../components/MyLayout';

import './home.scss';

const PostLink = props => {
  const { className, type } = props;
  return (
    <Link href={`/home/Edit?type=${type}`}>
      <p className={className}>{type}</p>
    </Link>
  );
};

export default class extends React.Component {
  // static async getInitialProps({req}) {
  //   const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  //   const res = await fetch(baseUrl+`/home/getDynamicList`)
  //   const show = await res.json();
  //   const dynamicList = show.data;
  //   return { dynamicList }
  // }
  constructor(props) {
    super(props);
    this.state = {
      pen: 0,
      dynamicList: []
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: `/home/getDynamicList`
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

  togglePen() {
    this.setState(prevState => ({
      pen: !prevState.pen
    }));
  }

  deleteContent(i) {
    this.setState(prevState => ({
      dynamicList: prevState.dynamicList.splice(i, 1)
    }));
  }

  addFollows(author, i) {
    this.setState(prevState => {
      prevState.dynamicList[i].isFollowed = !prevState.dynamicList[i].isFollowed;
      return {
        dynamicList: prevState.dynamicList
      };
    });
    // this.state.dynamicList[i].isFollowed = !this.state.dynamicList[i].isFollowed;
    // this.setState({
    //   dynamicList: this.state.dynamicList
    // });
    axios({
      method: 'POST',
      url: `/user/addFollows`,
      data: {
        author
      }
    }).then(({ data }) => {
      if (data.success) {
        console.log('success');
      } else {
        alert(data.message);
      }
    });
  }

  addLikes(id, i) {
    this.setState(prevState => {
      prevState.dynamicList[i].isLiked = !prevState.dynamicList[i].isLiked;
      return {
        dynamicList: prevState.dynamicList
      };
    });
    // this.state.dynamicList[i].isLiked = !this.state.dynamicList[i].isLiked;
    // this.setState({
    //   dynamicList: this.state.dynamicList
    // });
    axios({
      method: 'POST',
      url: `/user/addLikes`,
      data: {
        id
      }
    }).then(({ data }) => {
      if (data.success) {
        console.log('success');
      } else {
        alert(data.message);
      }
    });
  }

  render() {
    const { pen, dynamicList } = this.state;
    return (
      <div className="main-page">
        <Layout index="0">
          <div className="pen-start" onClick={() => this.togglePen()}>
            <i className="iconfont icon-pen" />
          </div>
          {dynamicList &&
            dynamicList.map((v, i) => (
              <Dynamic
                type="other"
                dynamic={v}
                key={i}
                addFollows={author => {
                  this.addFollows(author, i);
                }}
                addLikes={id => {
                  this.addLikes(id, i);
                }}
                deleteContent={() => this.deleteContent(i)}
              />
            ))}
        </Layout>
        {!!pen && (
          <div className="modle-choose">
            <div className="wrap">
              <PostLink className="pic" id="pic" type="pic" />
              <PostLink className="gif" id="gif" type="gif" />
              <PostLink className="words" id="words" type="words" />
              <PostLink className="voice" id="voice" type="voice" />
            </div>
            <i className="iconfont icon-close" onClick={() => this.togglePen()} />
          </div>
        )}
      </div>
    );
  }
}

// const default_img = '/static/images/default-img.png';

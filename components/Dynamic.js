import React, { Component } from 'react';
import './Dynamic.scss';

class Dynamic extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   previewContent: '',
    //   aceBoxH: null,
    //   originContent: '',
    //   inputValue: '',
    // };
  }

  deleteDynamic(id) {
    const { deleteDynamic } = this.props;
    deleteDynamic && deleteDynamic(id);
  }

  deleteContent(id) {
    const { deleteContent } = this.props;
    deleteContent && deleteContent(id);
  }

  addFollows(author) {
    const { addFollows } = this.props;
    addFollows && addFollows(author);
  }

  addLikes(id) {
    const { addLikes } = this.props;
    addLikes && addLikes(id);
  }

  render() {
    const { type = 'others', dynamic } = this.props;
    const DEFAULT_IMG = '/static/images/default-img.png';
    return (
      <div className="dynamic">
        {type !== 'me' && (
          <header>
            <img src={dynamic.userImg || DEFAULT_IMG} alt="default img" className="dy-pic" />
            <span className="author">{dynamic.author}</span>
            {!dynamic.isFollowed && (
              <span className="follow" onClick={() => this.addFollows(dynamic.author)}>
                follow
              </span>
            )}

            <i onClick={() => this.deleteContent(dynamic._id)} className="iconfont icon-close" />
          </header>
        )}
        <div className="content">
          {/* {
          dynamic.img &&  <img className="dy-img" src={dynamic.img || DEFAULT_IMG}></img>
        } */}
          <h3 className="dy-title">{dynamic.title}</h3>
          <p className="dy-content">{dynamic.content}</p>
        </div>
        {type === 'me' ? (
          <footer>
            <i className="iconfont icon-delete" onClick={() => this.deleteDynamic(dynamic._id)} />
            <i className="iconfont icon-pen" />
          </footer>
        ) : (
          <footer>
            <i
              className={`iconfont icon-like ${dynamic.isLiked ? 'red' : ''}`}
              onClick={() => this.addLikes(dynamic._id)}
            />
            <i className="iconfont icon-comment" />
          </footer>
        )}
      </div>
    );
  }
}

export default Dynamic;

// export default connect()(Dynamic)

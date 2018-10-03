
import Markdown from 'react-markdown'
import "./Dynamic.scss"

function deleteContent() {

}


const Dynamic = (props) => {
  const {type="others",dynamic} = props;
  const default_img = "/static/images/default-img.png";
  return (
    <div className="dynamic">
    {
      type!="me" &&
      <header>
        <img src={dynamic.userImg || default_img} alt="default image" className="dy-pic"></img>
        <span className="author">{dynamic.author}</span>
        <span className="follow">follow</span>
        <i onClick={deleteContent} className="iconfont icon-close"></i>
      </header>
    }
      <div className="content">
        <img className="dy-img" src={dynamic.img || default_img}></img>
        <h3 className="dy-title">{dynamic.title}</h3>
        <p className="dy-content">
        {dynamic.content}
        </p>
      </div>
        {
          type == "me" ?
          <footer>
            <i className="iconfont icon-delete"/>
            <i className="iconfont icon-pen"/>
          </footer>
          :
          <footer>
            <i className="iconfont icon-like"/>
            <i className="iconfont icon-comment"/>
          </footer>
        }
    </div>
  )
}


export default Dynamic

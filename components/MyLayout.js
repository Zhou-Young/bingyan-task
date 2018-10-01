import Header from './Header'

const layoutStyle = {
 
  
}

const Layout = (props) => {
  const {index}=props;
  return(
  <div style={layoutStyle}>
    <Header index={index}/>
    {props.children}
  </div>
)}

export default Layout
const express = require('express')
const next = require('next')
var mongoose = require('mongoose');
const  bodyParser  = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.connect('mongodb://localhost/bingyan-task', function(err) {
  if(err){
      console.log('连接失败');
  }else{
      console.log('连接成功');
  }
});

app.prepare()
.then(() => {
  const server = express()
  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
      extended: true
  }));

  require('./server/config/routes')(server);
  //signin
  // server.post('/usr/signin',(req, res)=>{
  //   console.log(req.body);
  //   res.json({
  //       success: true,
  //       message: '登录成功',
  //       data: {}
  //   })  
  // })

// server.get('/', (req, res) => {
//   User.fetch(function(err,user){
//     console.log(user);
//     if(err){
//         console.log(err)
//      }
//     res.render('index',{
//       title:'imooc',
//       user:user
//     })
// })
// console.log("主页 GET 请求");
// res.send('Hello World');
// })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

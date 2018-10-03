const express = require('express')
const next = require('next')
const mongoose = require('mongoose');
const  bodyParser  = require('body-parser')
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000;
const dbUrl = "mongodb+srv://userby:bingyantask@cluster0-brnen.mongodb.net/bingyan-task?retryWrites=true && authSource = admins";
// mongoose.connect('mongodb://localhost/bingyan-task', function(err) {
//   if(err){
//       console.log('连接失败');
//   }else{
//       console.log('连接成功');
//   }
// });

// mongodb+srv://<授权的用户名>:<授权的用户密码>@<集群地址>/?connect=direct mongodb+srv://user1:<PASSWORD>@cluster0-brnen.mongodb.net/test?retryWrites=true
mongoose.connect(dbUrl, function(err) {
  if(err){
      console.log('连接失败');
      console.log(err);
  }else{
      console.log('连接成功');
  }
});

// var MongoClient = require('mongodb').MongoClient;


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
  server.use(cookieParser());
  server.use(expressSession({
      secret: 'bingyan',
      // store: new mongoStore({
      //   url: dbUrl,
      //   // mongoOptions:  advancedOptions,
      //   collection: 'sessions'
      // }),
      // resave: false,
      // saveUninitialized: true

  }))
  server.disable('etag');

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


  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

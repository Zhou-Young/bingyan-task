const express = require('express')
const next = require('next')
const mongoose = require('mongoose');
const  bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const http = require('http');
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const dbUrl = "mongodb+srv://userby:bingyantask@cluster0-brnen.mongodb.net/bingyan-task?retryWrites=true && authSource = admins";

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
  const server = express();
  const server1 = require('http').Server(server)
  const io = require('socket.io')(server1)
  io.on('connection', socket => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    const _socket = socket;
    socket.on('client-chat', function (data) {
      _socket.broadcast.emit(data.other, { data: data.data, other: data.me, me: data.other });
    });
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

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server1.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

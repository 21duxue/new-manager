const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')

const logger = require('koa-logger')
// const koaBody = require('koa-better-body');
const koaBody = require('koa-body');
var path = require("path")
const KoaStatic = require('koa-static');
const cors = require('koa-cors');





const Message = require('./routes/message')
const users = require('./routes/users')
const growLog = require('./routes/grow-log')
const articlList = require('./routes/article-list')

const Flow = require('./routes/flow')

// error handler
onerror(app)

// //中间件
// app.use(koaBody({
//   uploadDir: path.resolve(__dirname, './upload1'),
//   keepExtensions: 'true' //文件是否需要扩展名
// }));
//middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
  multipart:true, // 支持文件上传
  formidable:{
    uploadDir:path.join(__dirname,'./upload1'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(KoaStatic('./'));



// 使用koa-cors
app.use(cors());


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(growLog.routes(),growLog.allowedMethods())
app.use(articlList.routes(),articlList.allowedMethods())
app.use(Message.routes(),Message.allowedMethods())
app.use(Flow.routes(),Flow.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

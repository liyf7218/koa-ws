/**
 * Main application file
 */
import Koa from 'koa'
import config from './config/environment'
import setConfig from './config/koa'
import globalConfig from './utils/global.js'
import wrapDB from './db_lite';
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import setRouter from './router'

// 导入koa主文件
const app = new Koa();

// 导入设置
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
setConfig(app);

// 导入全局设置文件( 即 绑定在 app.context 上的函数和变量 )
globalConfig(app);

// 导入数据库配置
// 绑定关系: ctx.context.db[collection_name] = collection_model;
// 若想使用较老版本 引'./db', 用新的 引'./db_lite'
wrapDB(app);

// 导入 cors,解决跨域问题
app.use(cors());

// 解析 post 请求的body,使用 ctx.request.body 获取
// 在查询时,不能直接将 ctx.request.body 传入 model.func( ... ),应该类似这样使用 model.func({name: ctx.request.body.name})
app.use(bodyParser());

// 导入路由,路由会自动将 router 下的文件都引入进来
setRouter(app);

// 官方错误处理
// 避免了为每个请求都嵌套一层错误处理,但是这里没有将错误进行分类
// 所以在应用规模扩大时,一定要注意补上
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// Start server
app.listen(config.port, config.ip, function () {
  console.log('=========================== [Koa server: Listening on %s : %d] ================================', config.ip, config.port);
});

// Expose app
export default app;

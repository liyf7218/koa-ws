/* * 此文件用到的规范请查看
* https://cn.mongoosedoc.top/docs/guide.html
* --------------------------------------------------------------------------------
* 注意！
* 此 Lite版本 只是 单纯地、统一地 将 ./models.js 文件中的 collections 绑定到 app.db 上，统一的方法是 model.log
* 如有特殊需求，请切换至普通版本 */
const fs = require('fs')
const path = require('path')
let mongoose = require('mongoose')
let config = require('./config.js')
let models = require('./models.js')

let wrapDB = function(app) {

  app.context.db = {}
  console.log("[DB: Initialization]", "Set app.context.db -> {}")

  // 1. 创建连接
  mongoose.connect(`mongodb://${config.domain}:${config.port}/${config.db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("[DB: Connection]",`mongodb://${config.domain}:${config.port}/${config.db_name}`)

  // 2.确认连接状态,以进行后续处理
  // 连接出错
  mongoose.connection.on("error", function(err) {
    console.error("[DB: Connection failed]", err)
  })

  // 断开数据库
  mongoose.connection.on("disconnected", function() {
    console.log("[DB: Disconnected]")
  })

  // 连接成功
  mongoose.connection.once('open', function() {
    // 3. 连接成功回掉函数,此函数没有参数.
    console.log("[DB: Connection]", `${config.db_name} connected.`)

  })

  // 遍历 models 中的 collection_options
  for (let collection_name in models) {
    let collection_options = models[collection_name]
    // 创建Schema(数据模板),在mongoose中,一切都始于Schema
    // 这里对查询的影响不太大
    // 但是对插入,更新等操作提出了限制,所以最好是老老实实的规定一下
    let schema = mongoose.Schema(collection_options)

    // 为schema添加方法
    // 译者注：注意了， method 是给 document 用的
    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    schema.methods.log = function() {
      console.log(this)
    }

    // 创建一个model,参数 ( model名, Schema, collection )
    let model = mongoose.model(collection_name, schema, collection_name);
    console.log("[DB: Generate model]", collection_name);

    // 将 model 绑定到 app.db 上
    app.context.db[collection_name] = model;
    console.log("[DB: Binded " + collection_name + " to app.db]");
  }
}

module.exports = wrapDB;
export default wrapDB;

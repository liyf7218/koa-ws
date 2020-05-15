/*
* 此文件用到的规范请查看
* https://cn.mongoosedoc.top/docs/guide.html
* --------------------------------------------------------------------------------
* 注意！
* 此版本将每个 collection 单独存放在一个文件中，为了使每个 mogoose.model 都可以进行特殊化配置
* 如仅需将 collection 简单地绑定，建议使用 db_lite 版本
*/
const fs = require('fs');
const path = require('path');
let mongoose = require('mongoose');
let config = require('./config.js');

let wrapDB = function (app) {

  app.context.db = {};
  console.log("Init app.context.db as Empty Object: app.context.db = {};")

  // 1. 创建连接
  mongoose.connect(
    `mongodb://${config.domain}:${config.port}/${config.db_name}`,
    { useNewUrlParser: true }
  );

  // 2.确认连接状态,以进行后续处理
  // 连接出错
  mongoose.connection.on("error", function(err){
      console.error("数据库链接失败:"+ err);
  })

  // 断开数据库
  mongoose.connection.on("disconnected", function(){
      console.log("数据库断开");
  })

  // 连接成功
  mongoose.connection.once('open', function () {
    // 3. 连接成功回掉函数,此函数没有参数.
    console.log(`${config.db_name} connected.`);

  })

  let fileDirectory = path.resolve(__dirname, "./model");
  if (fs.existsSync(fileDirectory)) {
    fs.readdir(fileDirectory, function (err, files) {
      if (err) {
        console.log("[Got error] connect_infos.fileDirectory: ", fileDirectory);
        console.log("[Got error] connect_infos.error: ", err);
        return;
      }

      files.forEach(function (filename) {
        console.log("Mount model file:", filename);
        require( path.resolve(fileDirectory, filename) )(mongoose)(app);
      })
    })
  }
}

module.exports = wrapDB;
export default wrapDB;

let path = require('path');

// path.win32.basename 统一返回的是 不含路径 的文件名, 我们同时要去除 .js 后缀.
let basename = path.win32.basename(__filename, '.js');
// 获取 集合名/collection_name
let [ collection_name ] = basename.split('.');

// 参数为 mongoose_instance,此文件用于将创建的 schema 和 model 挂载到实例上.
module.exports = function ( mongooseInstance ){

  // 创建Schema(数据模板),在mongoose中,一切都始于Schema
  let schema = mongooseInstance.Schema({
    index: String,
    value: String,
  })

  // 为schema添加方法
  // 译者注：注意了， method 是给 document 用的
  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  schema.methods.log = function () {
    console.log(this)
  }

  // 创建一个model,参数 ( model名, Schema, collection )
  let model = mongooseInstance.model(collection_name, schema, collection_name);
  console.log("Generate model: ", collection_name);

  return function (app) {
    app.context.db[collection_name] = model;
  }
}


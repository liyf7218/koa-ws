/* Main application routes */
const path = require('path');
const fs = require('fs');

let router = function(app) {
  // 查找当前目录下的所有 文件/目录
  fs.readdir( __dirname, function (err, files) {
    if (err) {
     return console.log("Cannot include router automatically.", err);
    }
    // 遍历文件/目录
    files.forEach(function (filename) {
      // 忽略以 .js 结尾的文件 ---> 其实就是忽略 本文件[index.js]
      if (!/.js$/.test(filename)){
        // 将所有遍历到的文件夹下的 index.js 引入进来
        let tmp = require('./' + filename);
        console.log('[Routes: add router]', filename)
        // 执行路由绑定操作
        app.use(tmp.routes());
        app.use(tmp.allowedMethods());
      }
    });
  });
};

export default router;
module.exports = router;

/*
* 此文件用于将 ../db/model 文件夹下的 collection_options 转换到 ./models.js 中
* ---------------------------------------------------------------------------------------------
* 用法：
* $ node ./convert.js
*/

let path = require('path')
let fs = require('fs')

// 找到要操作的文件夹
var fileDirectory = path.resolve(__dirname, "../db/model")

// 检测存在
if (fs.existsSync(fileDirectory)) {

	// 读取每个文件
  fs.readdir(fileDirectory, function (err, files) {
    if (err) {
      console.log("[convert.js: Got error] fileDirectory: ", fileDirectory);
      console.log("[convert.js: Got error] error: ", err);
      return;
    }

    // 遍历文件
    files.forEach(function (filename) {
    	let fullFilename = path.resolve(fileDirectory, filename)
      console.log("[convert.js: Read File ]", fullFilename);

      // 同步读取
      var data = fs.readFileSync(fullFilename).toString();
      console.log('[convert.js: Get data]', data)

      // 找到 "mongooseInstance.Schema(" 和 对应的")" 中间的字符串
      // ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ 未完成！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      let regExp = /mongooseInstance\.Schema*\)/g
      console.log('regExp', regExp)

      let result = regExp.exec(data)

      console.log('convert.js: Get result', result)
    })

    console.log("程序执行完毕。");
  })
}
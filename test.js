const path = require('path');
// console.log(__filename)

// // path.win32.basename 统一返回的是 不含路径的文件名, 然后去除 .js 后缀.
// let basename = path.win32.basename(__filename, '.js');

// console.log('basename: ', basename);

var fs=require('fs');
console.log(__dirname)
var fileDirectory = path.resolve(__dirname, "./router");
if(fs.existsSync(fileDirectory)){
  fs.readdir(fileDirectory, function (err, files) {
    if (err) {
      console.log(err);
      return;
    }

    var count = files.length;
    var results = {};
    files.forEach(function (filename) {
      // fs.readFile(filename, function (data) {
      //   results[filename] = data;
      //   count--;
      //   if (count <= 0) {
      //     // 对所有文件进行处理
      //     console.log(filename)
      //   }
      // });
      if (!/.js$/.test(filename))
      console.log(filename)
    });
  });
}
else {
    console.log(fileDirectory + "  Not Found!");
}
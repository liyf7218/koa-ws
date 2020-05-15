## 测试记录 ##
此文件用于保存试验过的操作和结果

### 使用postman,下载文件 ###
#### postman设置 ####
参考 [postman能够进行文件下载功能进行测试吗？](https://blog.csdn.net/xiongyouqiang/article/details/80439883)
具体配置: 
+ Method: POST
+ url: localhost:9001/downlaoad
+ send: 不直接使用发送,这样会传回乱码. 应该使用 "send and download" 选项

#### koa配置 ####
参考: 
1. [Koa2 之文件上传下载](https://segmentfault.com/a/1190000014056810) 
2. [koa-send实现文件下载](https://www.jianshu.com/p/79f1b3671cf0) 

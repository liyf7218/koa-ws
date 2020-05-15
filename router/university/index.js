import Router from 'koa-router'
let router = new Router()

router
// 查询功能
// body: Object
// return: Object
  .post('/university/list', async (ctx, next) => {
  let {request, db, getValidatedProps} = ctx;
  let res = {};
  let {pageNumber, pageSize} = request.body;
  let parameters = getValidatedProps(request.body)
  console.log('/university/list.parameters', parameters)
	res.data = await db.university.find(parameters).skip((pageNumber - 1) * pageSize).limit(parseInt(pageSize) || 10);
  res.total = await db.university.countDocuments(parameters);
	ctx.body = res;
})
// id/_id: [String, Number]
// return: Object
  .post('/university/get', async (ctx, next) => {
  let id = ctx.request.body._id || ctx.request.body.id
  console.log('/university/get.id', id)
  ctx.body = await ctx.db.university.findById(id)
})
// 新增/插入功能
// payload: [Array(Object),Object]
// return: payload
  .post('/university/add', async (ctx, next) => {
  let {payload} = ctx.request.body;
  console.log('/university/add.payload', payload)
  // 上传数据,统一用JSON
  let data = JSON.parse(payload);
  ctx.body = await ctx.db.university.create(data)
})
// 修改/更新 功能
// payload: [Array(Object),Object]
// return: payload
// About findByIdAndUpdate, see [https://cn.mongoosedoc.top/docs/api.html#findbyidandupdate_findByIdAndUpdate]
  .post('/university/update', async (ctx, next) => {
  let payload = JSON.parse(ctx.request.body.payload);
  console.log('/university/update', payload)
  if (!(payload instanceof Array)) {
    payload = [payload];
  }
  ctx.body = [];
  // 下面这个循环操作,用 Array.map/forEach ... 是不能将返回值赋给 ctx.body 的.
  // 很难受,还是原始的办法比较靠谱
  for (let index = 0; index < payload.length; index++) {
    let id = payload[index]._id || payload[index].id
    ctx.body.push(await ctx.db.university.findByIdAndUpdate(id, {
      $set: payload[index]
    }, {
      new: true,
      upsert: true
    }))
  }
})
// 删除 功能
// ids: [String, Array(String)]
// return: Array(Object)
  .post('/university/delete', async (ctx, next) => {
  console.log(ctx.request.body)
  let {ids} = ctx.request.body
  if (!(ids instanceof Array)) {
    ids = ids.split(',').map(ele => ele.trim())
  }
  ctx.body = []
  for (let i = 0; i < ids.length; i++) {
    ctx.body.push(await ctx.db.university.findByIdAndRemove(ids[i]));
  }
  console.log(ctx.body)
})

module.exports = router;
export default router;
